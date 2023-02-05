import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '../modules/data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = '../assets/db.json';

  constructor(private http: HttpClient) {}

  public dataList(): Observable<Data> {
    return this.http.get<Data>(this.url).pipe(
      (res) => res,
      (error) => error
    );
  }
}
