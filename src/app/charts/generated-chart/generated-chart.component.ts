import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from '~/app/models/ChartType';
import { BackendQuarkusService } from '~/app/services/backend-quarkus.service';
import { DatasetUtilsService } from '~/app/utils/dataset-utils.service';

@Component({
  selector: 'ns-generated-chart',
  templateUrl: './generated-chart.component.html',
  styleUrls: ['./generated-chart.component.css']
})
export class GeneratedChartComponent implements OnInit {

  private title = 'Prefeitura Municipal de Recife';
  chartTypes = new Array<ChartType>();

  datasetSelecionado = '';
  exercicioSelecionado: number;

  xAxis: string = '';
  yAxis: string = '';
  chartItems = new Array<any>();

  categoricalDate = false;

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.datasetSelecionado = params.datasetSelecionado;
    this.exercicioSelecionado = Number.parseInt(params.exercicioSelecionado);
    this.chartTypes = params.chartTypes;
    console.log(this.chartTypes);
    this.xAxis = params.xAxis;
    this.yAxis = params.yAxis;
    this.categoricalDate = params.dateFields.find(x => x === this.xAxis) ? true : false;
    
  }

}
