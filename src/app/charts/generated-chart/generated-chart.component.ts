import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendQuarkusService } from '~/app/services/backend-quarkus.service';

@Component({
  selector: 'ns-generated-chart',
  templateUrl: './generated-chart.component.html',
  styleUrls: ['./generated-chart.component.css']
})
export class GeneratedChartComponent implements OnInit {

  datasetSelecionado = '';
  exercicioSelecionado: number;

  constructor(
    private backendService: BackendQuarkusService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
  }

}
