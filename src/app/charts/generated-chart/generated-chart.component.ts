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

  datasetSelecionado = '';
  exercicioSelecionado: number;

  xAxis: string = '';
  yAxis: string = '';
  chartItems = new Array<any>();

  categoricalSource;

  constructor(
    private backendService: BackendQuarkusService,
    private datasetUtils: DatasetUtilsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);

    const params = this.route.snapshot.queryParams;

    this.datasetSelecionado = params.datasetSelecionado;
    this.exercicioSelecionado = Number.parseInt(params.exercicioSelecionado);
    this.xAxis = params.xAxis;
    this.yAxis = params.yAxis;

    this.backendService.getDatasetRecordsWithAxes(this.datasetSelecionado, this.exercicioSelecionado, this.xAxis, this.yAxis).subscribe(records => {

      const parsedResult = records.map(element => {

        element[this.yAxis] = this.datasetUtils.parseDatasetStringValue(element[this.yAxis]);

        return element;
      })
        .filter(element => element[this.yAxis] >= 0);

      console.log(this.datasetUtils.groupByPropertyAndSum(parsedResult, this.xAxis, this.yAxis));
      this.chartItems = this.datasetUtils.groupByPropertyAndSum(parsedResult, this.xAxis, this.yAxis).slice(0, 10);
    });

    this.categoricalSource = [
      { Country: " GermanyGermanyGermany Germany Germany GermanyGermany Spain", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: "France Spain", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
      { Country: "Bulgaria FranceFrance FranceFranceFrance", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
      { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
      // { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
    ];

  }

  resolveChartType(chartTypes: Array<ChartType>) {



  }

}
