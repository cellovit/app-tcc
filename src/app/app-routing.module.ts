import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { TabExecucaoDespesaComponent } from "./charts/execucao-despesas/tab-execucao-despesa/tab-execucao-despesa.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: "", component: TabExecucaoDespesaComponent },
    { path: "home", component: HomeComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
