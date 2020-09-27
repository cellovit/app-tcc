import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatasetRecifeService {

  uriDataset = `http://dados.recife.pe.gov.br/nl/api/3/action/datastore_search`;
  uriDatasetSql = `http://dados.recife.pe.gov.br/nl/api/3/action/datastore_search_sql`;
  resourceId = `dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda`;

  resources = [
    { categoria: 'despesas', exercicio: 2018, resourceId: 'df31a45d-2eae-43b8-b7ac-ac34ac66c5a8' },
    { categoria: 'despesas', exercicio: 2019, resourceId: 'dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda' },
    { categoria: 'despesas', exercicio: 2020, resourceId: '718e6705-a7e1-4395-a7c5-13c141c182f7' },

    { categoria: 'receitas', exercicio: 2018, resourceId: '9abaf8e5-91f3-4de0-89e4-1e2d526357ed' },
    { categoria: 'receitas', exercicio: 2019, resourceId: '5d39e363-d056-409b-942a-05124c9546e9' },
    { categoria: 'receitas', exercicio: 2020, resourceId: '1a49c246-df1a-4a9e-88be-5bdc05e6de24' },

    { categoria: 'licitacoes-concluidas', exercicio: null, resourceId: 'c5d7505c-381c-4670-a0c2-1fbf56df50b1' },
    { categoria: 'licitacoes-andamento', exercicio: null, resourceId: 'edf9dea6-7e31-4bbd-993e-e715e87d13e7' },
  ];

  constructor(
    @Inject(HttpClient) public httpClient: HttpClient
  ) {
  }

  public getDespesasWithParams(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: params,
      responseType: 'json'
    });
  }

  public getDespesasDataset(limit: number): Observable<any> {
    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: {
        resource_id: 'dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda',
        fields: ['mes_movimentacao', 'valor_pago', 'valor_empenhado', 'valor_liquidado'],
        filters: '{"mes_movimentacao": ["1", "2", "3", "4", "5", "6"]}',
        sort: 'mes_movimentacao',
        distinct: 'true',
        // limit: '40000'
        limit: limit.toString()
      },
      responseType: 'json'
    });
  }

  public getDespesasPorOrgao(limit: number): Observable<any> {

    const filtroMes = '"mes_movimentacao": ["1", "2", "3", "4", "5", "6"]';
    const filtroOrgao = '"orgao_nome": ["SECRETARIA DE EDUCAÇÃO", "SECRETARIA DE TURISMO, ESPORTES E LAZER", "SECRETARIA DE SAÚDE - ADMINISTRAÇÃO SUPERVISIONADA", "SECRETARIA DE DESENVOLVIMENTO SUSTENTÁVEL E MEIO AMBIENTE - ADMINISTRAÇÃO SUPERVISIONADA", "SECRETARIA DE SEGURANÇA URBANA"]'

    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: {
        resource_id: 'dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda',
        fields: ['valor_pago', 'orgao_nome'],
        filters: '{' + filtroMes + ',' + filtroOrgao + '}',
        sort: 'orgao_nome',
        distinct: 'true',
        // limit: '40000'
        limit: limit.toString()
      },
      responseType: 'json'
    });
  }

  public getDespesasPorOrgao2(limit: number): Observable<any> {

    const filtroMes = '"mes_movimentacao": ["1", "2", "3", "4", "5", "6"]';
    const filtroOrgao = '"orgao_nome": ["SECRETARIA DE EDUCAÇÃO", "SECRETARIA DE TURISMO, ESPORTES E LAZER", "SECRETARIA DE SAÚDE - ADMINISTRAÇÃO SUPERVISIONADA", "SECRETARIA DE DESENVOLVIMENTO SUSTENTÁVEL E MEIO AMBIENTE - ADMINISTRAÇÃO SUPERVISIONADA", "SECRETARIA DE SEGURANÇA URBANA"]'

    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: {
        resource_id: 'dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda',
        fields: ['valor_pago', 'orgao_nome'],
        filters: '{' + filtroMes + '}',
        sort: 'orgao_nome',
        distinct: 'true',
        // limit: '40000'
        limit: limit.toString()
      },
      responseType: 'json'
    });
  }



  public getDespesasPorOrgaoSQL(): Observable<any> {

    // SUM(CAST(valor_pago) as int) AS TotalPago
    //SUM (CAST (exercicio as float))

    // const sql = 'SELECT orgao_nome, SUM (CAST (valor_pago as float)) AS totalPago from "dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda"'
    //   + ' WHERE mes_movimentacao IN (\'1\', \'2\', \'3\', \'4\', \'5\', \'6\')'
    //   + ' AND orgao_nome IN (\'SECRETARIA DE EDUCAÇÃO\', \'SECRETARIA DE TURISMO, ESPORTES E LAZER\', \'SECRETARIA DE SAÚDE - ADMINISTRAÇÃO SUPERVISIONADA\', \'SECRETARIA DE DESENVOLVIMENTO SUSTENTÁVEL E MEIO AMBIENTE - ADMINISTRAÇÃO SUPERVISIONADA\', \'SECRETARIA DE SEGURANÇA URBANA\')'
    //   // + ' LIMIT 1000'

    //   + ' GROUP BY orgao_nome';
    // + ' ORDER BY totalPago DESC LIMIT 100;';

    const sql = 'SELECT _id, orgao_nome, CAST(valor_pago AS BIGINT) as v1 from "dc9744c1-ab3d-4597-b8ce-a01c9ee2fdda"'
      + ' WHERE mes_movimentacao IN (\'1\')'
     //  + ' AND orgao_nome IN (\'SECRETARIA DE EDUCAÇÃO\', \'SECRETARIA DE TURISMO, ESPORTES E LAZER\', \'SECRETARIA DE SAÚDE - ADMINISTRAÇÃO SUPERVISIONADA\', \'SECRETARIA DE DESENVOLVIMENTO SUSTENTÁVEL E MEIO AMBIENTE - ADMINISTRAÇÃO SUPERVISIONADA\', \'SECRETARIA DE SEGURANÇA URBANA\')'
      // + ' LIMIT 1000'

      + ' GROUP BY orgao_nome, v1';
    + ' ORDER BY orgao_nome DESC LIMIT 100;';

    console.log(sql);

    return this.httpClient.get<any>(`${this.uriDatasetSql}`, {
      params: {
        sql: sql
      },
      // responseType: 'json'
    });
  }

  public getTotalRecords(exercicio: number, categoria: string): Observable<any> {

    const resource = this.resources
      .find(x => x.exercicio === exercicio
        && x.categoria === categoria) as any;
    
    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: {
        resource_id: resource.resourceId,
        // fields: ['mes_movimentacao'],
        // filters: '{"valor_pago": "> 0"}',
        // sort: 'mes_movimentacao',
        distinct: 'true',
        limit: '1'
      },
      responseType: 'json'
    }).pipe(map((d: any) => d));
  }

  public getDatasetResult(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.uriDataset}`, {
      params: params,
      responseType: 'json'
    });
  }

}
