import { Component, OnInit } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { sub, format, Duration } from 'date-fns';
import { Data } from '../../data';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts: () => import('echarts') }),
    },
  ],
})
export class ChartComponent implements OnInit {
  options: EChartsOption = {};
  filter: Duration = { months: 1 };
  error: string = '';

  public dataList: Data | any = [];
  public newDataList: Data | any = [];

  constructor(private dataService: DataService) {}

  renderChart(params: {}) {
    this.filter = params;
    const chartData = this.getChartData();

    this.options = {
      xAxis: {
        type: 'category',
        data: Object.keys(chartData)
          .sort()
          .map((item) => item),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{c}',
      },
      series: [
        {
          data: Object.keys(chartData)
            .sort()
            .map((item) => chartData[item].length),
          type: 'line',
          symbolSize: 10,
        },
      ],
    };
  }

  getRangedData() {
    return this.dataList.filter((item: Data) => {
      return (
        item.timestamp_at >=
        format(
          sub(
            new Date(this.dataList[this.dataList.length - 1].timestamp_at),
            this.filter
          ),
          'yyyy-MM-dd'
        )
      );
    });
  }

  getChartData() {
    this.newDataList = {};
    this.getRangedData().forEach(
      (item: { timestamp_at: string; user_id: number }) => {
        const itemDate = format(new Date(item.timestamp_at), 'yyyy-MM-dd');
        if (
          this.newDataList &&
          Object.keys(this.newDataList).includes(itemDate)
        ) {
          if (!this.newDataList[itemDate].includes(item.user_id)) {
            this.newDataList[itemDate].push(item.user_id);
          }
        } else {
          this.newDataList = {
            ...this.newDataList,
            [itemDate]: [item.user_id],
          };
        }
      }
    );
    return this.newDataList;
  }

  ngOnInit() {
    this.dataService.dataList().subscribe({
      next: (res) => {
        this.dataList = res;
        if (this.dataList) {
          this.renderChart(this.filter);
        }
      },
      error: (error) => (this.error = error),
    });
  }
}
