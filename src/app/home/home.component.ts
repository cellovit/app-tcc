import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DatasetRecifeService } from "../dataset-municipio/dataset-recife.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadPieChartComponent } from "nativescript-ui-chart/angular";
import { RadPieChart, RadCartesianChart } from "nativescript-ui-chart";

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    @ViewChild(RadCartesianChart, { static: false }) chart: RadCartesianChart;

    private title = 'Prefeitura Municipal de Recife';
    json1: any = [];
    json2: any = [];
    jsonParsed;
    filtroOrgao: string;
    filtroMes: string;

    gastoTotalOrgaos = 0;

    constructor(
        private datasetService: DatasetRecifeService
    ) {
    }

    ngOnInit() {
        // this.datasetService.getDespesasTotalRecords().subscribe(totalRecords => {
        //     this.datasetService.getDespesasDataset(totalRecords.result.total).subscribe(response => {
        //         const result1 = response.result.records as Array<any>;

        //         const result2 = result1.map(element => {
        //             element.valor_pago = Number.parseFloat(element.valor_pago);
        //             element.valor_empenhado = Number.parseFloat(element.valor_empenhado);
        //             element.valor_liquidado = Number.parseFloat(element.valor_liquidado);
        //             return element;
        //         }).filter(element => element.valor_pago >= 0 && element.valor_empenhado >= 0 && element.valor_liquidado >= 0);

        //         this.json1 = result2;

        //         // console.log(result2.length);

        //     }, (error) => {
        //         console.log(error);
        //     });

        //     this.datasetService.getDespesasPorOrgao2(totalRecords.result.total).subscribe(response2 => {

        //         const result1 = response2.result.records as Array<any>;

        //         const result2 = result1.map(element => {
        //             element.valor_pago = Number.parseFloat(element.valor_pago);
        //             return element;
        //         }).filter(element => element.valor_pago >= 0);

        //         let result = [];
        //         result2.reduce(function (res, value) {
        //             if (!res[value.orgao_nome]) {
        //                 res[value.orgao_nome] = { orgao_nome: value.orgao_nome, valor_pago: 0 };
        //                 result.push(res[value.orgao_nome])
        //             }
        //             res[value.orgao_nome].valor_pago += value.valor_pago;
        //             return res;
        //         }, {});

        //         result = result.sort(this.dynamicSort('-valor_pago')).slice(0, 5);

        //         result.forEach(x => {
        //             this.gastoTotalOrgaos += x.valor_pago;
        //         });

        //         console.log(result);

        //         this.json2 = result;

        //         console.log(result2.length);

        //     });
        // });
    }

    onSelected(args) {

        // recupera o objeto através do index do datapoint clicado

        console.log('pointIndex: ' + args.pointIndex);
        const index = args.pointIndex as number;
        console.log(this.json1[index]);
    }

    onDeselected(args) {
        // console.log('DeSelect Event');
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

}