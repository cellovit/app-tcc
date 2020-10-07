import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DatasetRecifeService } from "../dataset-municipio/dataset-recife.service";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    private title = 'Prefeitura Municipal de Recife';

    xAxis;
    yAxis;
    datasetSelecionado;
    exercicioSelecionado;

    var1 = new ValueList<any>();
    var2 = new ValueList<any>();
    datasetsDisponiveis = new ValueList<any>();
    exerciciosDisponiveis = new ValueList<any>();

    constructor(
        private datasetService: DatasetRecifeService
    ) { }

    ngOnInit() {
        // for (let loop = 0; loop < 5; loop++) {
        //     this.var1.push({
        //         value: `I${loop}`,
        //         display: `Item ${loop}`,
        //     });

        //     this.var2.push({
        //         value: `I${loop}`,
        //         display: `Item ${loop}`,
        //     });
        // }

        const campos = ['mes_movimentacao', 'valor_empenhado', 'valor_liquidado', 'funcao_nome', 'empenho_modalidade_nome'];

        campos.forEach(x => {
            this.var1.push({
                value: x,
                display: x,
            });

            this.var2.push({
                value: x,
                display: x,
            });
        });

        this.exerciciosDisponiveis.push({ value: '2018', display: '2018' });
        this.exerciciosDisponiveis.push({ value: '2019', display: '2019' });
        this.exerciciosDisponiveis.push({ value: '2020', display: '2020' });

        this.datasetsDisponiveis.push({ value: 'Despesas', display: 'Despesas' });
        this.datasetsDisponiveis.push({ value: 'Receitas', display: 'Receitas' });
        this.datasetsDisponiveis.push({ value: 'Licitações', display: 'Licitações' });
    }

    public onchange(args: SelectedIndexChangedEventData) {
        // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}. New value is "${this.items.getValue(
        //     args.newIndex)}"`);
    }

    gerarGrafico() {
        console.log('btn');

    }

}