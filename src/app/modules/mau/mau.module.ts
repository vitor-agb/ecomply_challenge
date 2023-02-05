import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { MauComponent } from '../pages/mau/mau.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [ChartComponent, MauComponent],
  imports: [CommonModule, NgxEchartsModule, FormsModule, HttpClientModule],
})
export class MauModule {}
