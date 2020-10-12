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

  chartTypes = new Array<ChartType>();

  datasetSelecionado = '';
  exercicioSelecionado: number;

  xAxis: string = '';
  yAxis: string = '';
  chartItems = new Array<any>();

  categoricalDate = false;

  constructor(
    private backendService: BackendQuarkusService,
    private datasetUtils: DatasetUtilsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams);

    const params = this.route.snapshot.queryParams;

    this.datasetSelecionado = params.datasetSelecionado;
    this.exercicioSelecionado = Number.parseInt(params.exercicioSelecionado);
    this.chartTypes = params.chartTypes;
    console.log(this.chartTypes);
    this.xAxis = params.xAxis;
    this.yAxis = params.yAxis;
    this.categoricalDate = params.dateFields.find(x => x === this.xAxis) ? true : false;
    // console.log(this.categoricalDate);

    this.backendService.getDatasetRecordsWithAxes(this.datasetSelecionado, this.exercicioSelecionado, this.xAxis, this.yAxis).subscribe(records => {

      const parsedResult = records.map(element => {

        element[this.yAxis] = this.datasetUtils.parseDatasetStringValue(element[this.yAxis]);

        return element;
      })
        .filter(element => element[this.yAxis] >= 0);

      this.chartItems = this.datasetUtils.groupByPropertyAndSum(parsedResult, this.xAxis, this.yAxis).slice(0, 10);
    });
  }

  resolveChartType(chartTypes: Array<ChartType>) {

    // if (this.chartTypes.some(x => x === ChartType.Bar))

  }

}
