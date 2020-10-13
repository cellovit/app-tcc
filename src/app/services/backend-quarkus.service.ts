import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartType } from '../models/ChartType';

@Injectable({
  providedIn: 'root'
})
export class BackendQuarkusService {

  uri = `http://backend-quarkus-tcc.herokuapp.com`;

  constructor(
    @Inject(HttpClient) public httpClient: HttpClient
  ) { }

  // /records/{categoria}/{exercicio}
  public getDatasetRecords(categoria: string, exercicio: number): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/data/records/${categoria}/${exercicio}`);
  }

  // /records/{categoria}/{exercicio}/{xAxis}/{yAxis}
  public getDatasetRecordsWithAxes(categoria: string, exercicio: number, xAxis: string, yAxis: string): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/data/records/${categoria}/${exercicio}/${xAxis}/${yAxis}`);
  }

  // /fields/{categoria}/{exercicio}
  public getDatasetFields(categoria: string, exercicio: number): Observable<any> {
    return this.httpClient.get<any>(`${this.uri}/data/fields/${categoria}/${exercicio}`);
  }

  // /chartTypes/{categoria}/{exercicio}/{xAxis}/{yAxis}
  public getChartTypes(categoria: string, exercicio: number, xAxis: string, yAxis: string): Observable<Array<ChartType>> {
    return this.httpClient.get<any>(`${this.uri}/data/chartTypes/${categoria}/${exercicio}/${xAxis}/${yAxis}`);
  }

  // /exerciciosDisponiveis/{categoria}
  public getExerciciosDisponiveisByCategoria(categoria: string, exercicio: number, xAxis: string, yAxis: string): Observable<Array<number>> {
    return this.httpClient.get<any>(`${this.uri}/datasetResource/exerciciosDisponiveis/${categoria}`);
  }
}
