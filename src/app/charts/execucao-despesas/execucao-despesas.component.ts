import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DatasetRecifeService } from '~/app/dataset-municipio/dataset-recife.service';
import { DatasetUtilsService } from '~/app/utils/dataset-utils.service';

var numeral = require('numeral');

@Component({
  selector: 'ns-execucao-despesas',
  templateUrl: './execucao-despesas.component.html',
  styleUrls: ['./execucao-despesas.component.css']
})
export class ExecucaoDespesasComponent implements OnInit {

  @Input() exercicio: number;
  rendered = false;

  json1: any = [];

  arrayTotalPago: Array<any> = [];
  arrayTotalEmpenhado: Array<any> = [];
  arrayTotalLiquidado: Array<any> = [];

  arrayTotalPagoFuncao: Array<any> = [];
  arrayTotalEmpenhadoFuncao: Array<any> = [];
  arrayTotalLiquidadoFuncao: Array<any> = [];

  arrayTotalPagoModalidade: Array<any> = [];

  jsonParsed;
  filtroOrgao: string;
  filtroMes: string;

  categoria = 'despesas';

  totalPagoString = '0';
  totalEmpenhadoString = '0';
  totalLiquidadoString = '0';

  constructor(
    private datasetService: DatasetRecifeService,
    private datasetUtils: DatasetUtilsService
  ) { }

  ngOnInit() {

    this.datasetService.getTotalRecords(this.exercicio, 'despesas').subscribe(totalRecords => {

      console.log(totalRecords.result.total);

      const params = this.getParams(totalRecords.result.total);

      this.datasetService.getDatasetResult(params).subscribe(response => {

        console.log(response);

        this.processDatasetApiResult(response);
      }, (error) => {
        console.log(error);
      });
    });

  }

  getParams(limit?: number) {

    const resource = this.datasetService.resources
      .find(x => x.exercicio === this.exercicio
        && x.categoria === this.categoria) as any;

    const params = {
      resource_id: resource.resourceId,
      fields: ['mes_movimentacao', 'valor_pago', 'valor_empenhado', 'valor_liquidado', 'funcao_nome', 'empenho_modalidade_nome'],
      // filters: '{"mes_movimentacao": ["1", "2", "3", "4", "5", "6"]}',
      sort: 'mes_movimentacao',
      distinct: 'true',
      // limit: '600'
      limit: limit.toString()
    };

    return params;
  }

  processDatasetApiResult(apiResult) {
    const result1 = apiResult.result.records as Array<any>;

    const parsedResult = result1.map(element => {

      element.valor_pago = this.datasetUtils.parseDatasetStringValue(element.valor_pago);
      element.valor_empenhado = this.datasetUtils.parseDatasetStringValue(element.valor_empenhado);
      element.valor_liquidado = this.datasetUtils.parseDatasetStringValue(element.valor_liquidado);

      if (element.funcao_nome === 'ASSISTÊNCIA SOCIAL') {
        element.funcao_nome = 'ASSIST. SOCIAL'
      }

      if (element.funcao_nome === 'PREVIDÊNCIA SOCIAL') {
        element.funcao_nome = 'PREV. SOCIAL'
      }

      if (element.funcao_nome === 'DIREITOS DA CIDADANIA') {
        element.funcao_nome = 'CIDADANIA'
      }

      return element;
    })
      .filter(element => element.valor_pago >= 0 && element.valor_empenhado >= 0 && element.valor_liquidado >= 0);

    this.arrayTotalPago = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'mes_movimentacao', 'valor_pago');
    this.arrayTotalEmpenhado = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'mes_movimentacao', 'valor_empenhado');
    this.arrayTotalLiquidado = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'mes_movimentacao', 'valor_liquidado');

    this.arrayTotalPagoFuncao = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'funcao_nome', 'valor_pago').slice(0, 5).sort(this.datasetUtils.dynamicSort('valor_pago'));
    this.arrayTotalEmpenhadoFuncao = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'funcao_nome', 'valor_empenhado').slice(0, 5).sort(this.datasetUtils.dynamicSort('valor_empenhado'));
    this.arrayTotalLiquidadoFuncao = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'funcao_nome', 'valor_liquidado').slice(0, 5).sort(this.datasetUtils.dynamicSort('valor_liquidado'));

    const totalPago = this.arrayTotalPago.reduce((a, b) => a + (b['valor_pago'] || 0), 0).toFixed(0);
    const totalEmpenhado = this.arrayTotalEmpenhado.reduce((a, b) => a + (b['valor_empenhado'] || 0), 0).toFixed(0);
    const totalLiquidado = this.arrayTotalLiquidado.reduce((a, b) => a + (b['valor_liquidado'] || 0), 0).toFixed(0);

    this.totalPagoString = 'R$ ' + this.datasetUtils.numberWithCommas(totalPago);
    this.totalEmpenhadoString = 'R$ ' + this.datasetUtils.numberWithCommas(totalEmpenhado);
    this.totalLiquidadoString = 'R$ ' + this.datasetUtils.numberWithCommas(totalLiquidado);

    this.arrayTotalPagoModalidade = this.datasetUtils.groupByPropertyAndSum(parsedResult, 'empenho_modalidade_nome', 'valor_pago').slice(0, 10).sort(this.datasetUtils.dynamicSort('valor_pago'));

    this.rendered = true;

  }

  // recupera o objeto através do index do datapoint clicado
  onSelected(args) {
    console.log('pointIndex: ' + args.pointIndex);
    const index = args.pointIndex as number;
    // console.log(this.json1[index]);
  }

  onDeselected(args) {
    // console.log('DeSelect Event');
  }

}
