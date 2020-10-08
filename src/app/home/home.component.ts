import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DatasetRecifeService } from "../dataset-municipio/dataset-recife.service";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { BackendQuarkusService } from "../services/backend-quarkus.service";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    private title = 'Prefeitura Municipal de Recife';

    xAxisIndex;
    yAxisIndex;
    datasetSelecionado = '';
    exercicioSelecionado: number;

    var1 = new ValueList<any>();
    var2 = new ValueList<any>();
    datasetsDisponiveis = new ValueList<any>();
    exerciciosDisponiveis = new ValueList<any>();

    constructor(
        private datasetService: DatasetRecifeService,
        private backendService: BackendQuarkusService
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

                if(element !== '_id') {
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
        const xAxis = this.var1.getValue(this.xAxisIndex);
        const yAxis = this.var2.getValue(this.yAxisIndex);

        this.backendService.getChartTypes(this.datasetSelecionado, this.exercicioSelecionado, xAxis, yAxis).subscribe(res => {
            console.log(res);
        });
    }

    private limpaAxis() {
        this.var1 = new ValueList<any>();
        this.var2 = new ValueList<any>();
    }

}