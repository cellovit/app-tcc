import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartType } from '../models/ChartType';

@Injectable({
  providedIn: 'root'
})
export class BackendQuarkusService {

  uri = `https://backend-quarkus-tcc.herokuapp.com`;

  constructor(
    @Inject(HttpClient) public httpClient: HttpClient
  ) { }

  // /records/{categoria}/{exercicio}
  public getDatasetRecords(categoria: string, exercicio: number): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/data/records/${categoria}/${exercicio}`, );
  }

  // /fields/{categoria}/{exercicio}
  public getDatasetFields(categoria: string, exercicio: number): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/data/fields/${categoria}/${exercicio}`, );
  }

  // /chartTypes/{categoria}/{exercicio}/{xAxis}/{yAxis}
  public getChartTypes(categoria: string, exercicio: number, xAxis: string, yAxis: string): Observable<Array<ChartType>> {
    return this.httpClient.get<any>(`${this.uri}/data/chartTypes/${categoria}/${exercicio}/${xAxis}/${yAxis}`, );
  }
}
