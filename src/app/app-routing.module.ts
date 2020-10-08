import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ChartExampleComponent } from "./charts/chart-example/chart-example.component";
import { GeneratedChartComponent } from "./charts/generated-chart/generated-chart.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "execucao-despesa", component: ChartExampleComponent },
    { path: "generated-chart", component: GeneratedChartComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
