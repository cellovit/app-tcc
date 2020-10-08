import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DatasetRecifeService } from "../dataset-municipio/dataset-recife.service";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { BackendQuarkusService } from "../services/backend-quarkus.service";
import { BarSeries, CategoricalAxis, LinearAxis, RadCartesianChart, RadPieChart } from "nativescript-ui-chart";
import { EventData, Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular";
import { NavigationExtras } from "@angular/router";
import { ChartType } from "../models/ChartType";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    private title = 'Prefeitura Municipal de Recife';
    showGenerateGraphButton = false;
    showAxes = false;

    xAxis = '';
    yAxis = '';
    xAxisIndex;
    yAxisIndex;
    datasetSelecionado = '';
    exercicioSelecionado: number;

    var1 = new ValueList<any>();
    var2 = new ValueList<any>();
    datasetsDisponiveis = new ValueList<any>();
    exerciciosDisponiveis = new ValueList<any>();

    chart: RadPieChart;

    constructor(
        // private datasetService: DatasetRecifeService,
        private backendService: BackendQuarkusService,
        page: Page, private routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        this.exerciciosDisponiveis.push({ value: 0, display: 'Sem exercício' });
        this.exerciciosDisponiveis.push({ value: 2018, display: '2018' });
        this.exerciciosDisponiveis.push({ value: 2019, display: '2019' });
        this.exerciciosDisponiveis.push({ value: 2020, display: '2020' });

        this.datasetsDisponiveis.push({ value: 'despesas', display: 'Despesas' });
        this.datasetsDisponiveis.push({ value: 'receitas', display: 'Receitas' });
        this.datasetsDisponiveis.push({ value: 'licitacoes-concluidas', display: 'Licitações Concluídas' });
        this.datasetsDisponiveis.push({ value: 'licitacoes-andamento', display: 'Licitações em andamento' });
    }

    public onSelectedDatasetChange(args: SelectedIndexChangedEventData) {
        this.datasetSelecionado = this.datasetsDisponiveis.getValue(args.newIndex);
        this.limpaAxis();
    }

    public onSelectedExercicioChange(args: SelectedIndexChangedEventData) {

        this.exercicioSelecionado = this.exerciciosDisponiveis.getValue(args.newIndex);

        this.limpaAxis();

        this.backendService.getDatasetFields(this.datasetSelecionado, this.exercicioSelecionado).subscribe(res => {
            res.Date.forEach(element => {
                this.var1.push({
                    value: element,
                    display: element,
                });
            });

            res.Categorical.forEach(element => {
                this.var1.push({
                    value: element,
                    display: element,
                });
            });

            res.Numerical.forEach(element => {

                if (element !== '_id') {
                    this.var1.push({
                        value: element,
                        display: element,
                    });

                    this.var2.push({
                        value: element,
                        display: element,
                    });
                }
            });
        });
    }

    gerarGrafico() {
        this.xAxis = this.var1.getValue(this.xAxisIndex);
        this.yAxis = this.var2.getValue(this.yAxisIndex);

        this.backendService.getChartTypes(this.datasetSelecionado, this.exercicioSelecionado, this.xAxis, this.yAxis).subscribe(res => {
            // console.log(res);

            this.navigateToChartsComponent(res, this.datasetSelecionado, this.exercicioSelecionado, this.xAxis, this.yAxis);

        });
    }

    private limpaAxis() {
        this.var1 = new ValueList<any>();
        this.var2 = new ValueList<any>();
    }

    private constructChart() {

        const cartesianChart = new RadCartesianChart();
        const barSeries = new BarSeries();

        const horizontalAxis = new CategoricalAxis();
        const verticalAxis = new LinearAxis();

        horizontalAxis.setProperty('display', this.exerciciosDisponiveis);
        verticalAxis.setProperty('value', this.exerciciosDisponiveis);

        barSeries.horizontalAxis = horizontalAxis;
        barSeries.verticalAxis = verticalAxis;

        cartesianChart.series.push(barSeries);

        // cartesianChart.

    }

    private navigateToChartsComponent(chartTypes: Array<ChartType>, datasetSelecionado: string, exercicioSelecionado: number, xAxis: string, yAxis: string) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'chartTypes': chartTypes,
                'datasetSelecionado': datasetSelecionado,
                'exercicioSelecionado': exercicioSelecionado,
                'xAxis': xAxis,
                'yAxis': yAxis
            }
        };

        this.routerExtensions.navigate(['/generated-chart'], navigationExtras);

    }

}