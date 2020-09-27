import { Component, OnInit, Input } from '@angular/core';
import { DatasetRecifeService } from '~/app/dataset-municipio/dataset-recife.service';
import { DatasetUtilsService } from '~/app/utils/dataset-utils.service';

@Component({
  selector: 'ns-execucao-receita',
  templateUrl: './execucao-receita.component.html',
  styleUrls: ['./execucao-receita.component.css']
})
export class ExecucaoReceitaComponent implements OnInit {

  @Input() exercicio: number;
  rendered = false;

  json1: any = [];

  arrayArrecadado: Array<any> = [];
  // arrayTotalEmpenhado: Array<any> = [];
  // arrayTotalLiquidado: Array<any> = [];

  jsonParsed;

  categoria = 'receitas';

  constructor(
    private datasetService: DatasetRecifeService,
    private datasetUtils: DatasetUtilsService
  ) { }

  ngOnInit() {

    this.datasetService.getTotalRecords(this.exercicio, this.categoria).subscribe(totalRecords => {

      console.log(totalRecords.result.total);

      const params = this.getParams(totalRecords.result.total);

      this.datasetService.getDatasetResult(params).subscribe(response => {
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
      fields: ['mes', 'mes_nome', 'orgao_nome', 'receita_arrecadada', 'receita_prevista_atualizada'],
      // filters: '{"mes_movimentacao": ["1", "2", "3", "4", "5", "6"]}',
      sort: 'mes',
      distinct: 'true',
      // limit: '600'
      limit: limit.toString()
    };

    return params;
  }

  processDatasetApiResult(apiResult) {
    const result1 = apiResult.result.records as Array<any>;

    const parsedResult = result1.map(element => {

      element.receita_arrecadada = this.datasetUtils.parseDatasetStringValueReceita(element.receita_arrecadada);
      element.receita_prevista_atualizada = this.datasetUtils.parseDatasetStringValueReceita(element.receita_prevista_atualizada);

      return element;

    }).filter(element => element.receita_arrecadada > 0);

    this.arrayArrecadado

    this.rendered = true;

  }

}
