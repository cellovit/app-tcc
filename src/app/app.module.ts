import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./home/home.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TabExecucaoDespesaComponent } from "./charts/execucao-despesas/tab-execucao-despesa/tab-execucao-despesa.component";
import { LoginComponent } from "./auth/login/login.component";
import { ActionBarComponent } from "./shared/ui/action-bar/action-bar.component";
import { ExecucaoDespesasComponent } from "./charts/execucao-despesas/execucao-despesas.component";
import { LancadoArrecadadoComponent } from "./charts/lancado-arrecadado/lancado-arrecadado.component";
import { ProgressSpinnerComponent } from "./shared/ui/progress-spinner/progress-spinner.component";
import { ExecucaoReceitaComponent } from "./charts/execucao-receita/execucao-receita.component";
import { TabExecucaoReceitaComponent } from "./charts/execucao-receita/tab-execucao-receita/tab-execucao-receita.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { ChartExampleComponent } from './charts/chart-example/chart-example.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        NativeScriptCommonModule,        
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIChartModule,
        NativeScriptUIListViewModule,
        DropDownModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        ActionBarComponent,
        ExecucaoDespesasComponent,
        LancadoArrecadadoComponent,
        TabExecucaoDespesaComponent,
        ProgressSpinnerComponent,
        ExecucaoReceitaComponent,
        TabExecucaoReceitaComponent,
        ChartExampleComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
