import { Component, Input, OnInit } from '@angular/core';
import { BackendQuarkusService } from '~/app/services/backend-quarkus.service';
import { DatasetUtilsService } from '~/app/utils/dataset-utils.service';

@Component({
  selector: 'ns-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {

  @Input('datasetSelecionado') datasetSelecionado;
  @Input('exercicioSelecionado') exercicioSelecionado;
  @Input('xAxis') xAxis;
  @Input('yAxis') yAxis;

  chartItems;

  constructor(
    private backendService: BackendQuarkusService,
    private datasetUtils: DatasetUtilsService,
  ) { }

  ngOnInit() {
    this.backendService.getDatasetRecordsWithAxes(this.datasetSelecionado, this.exercicioSelecionado, this.xAxis, this.yAxis).subscribe(records => {

      const parsedResult = records.map(element => {

        element[this.yAxis] = this.datasetUtils.parseDatasetStringValue(element[this.yAxis]);

        return element;
      })
        .filter(element => element[this.yAxis] >= 0);

      this.chartItems = this.datasetUtils.groupByPropertyAndSum(parsedResult, this.xAxis, this.yAxis).slice(0, 20);
    });
  }

}
