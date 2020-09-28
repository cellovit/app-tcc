import { Component, OnInit, Inject, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { UiService } from "./shared/ui/service/ui.service";
import { Subscription } from "rxjs";
import { isAndroid } from "tns-core-modules/platform";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ['app.component.css']
})
export class AppComponent {

    private drawer: RadSideDrawer;
    private drawerSub: Subscription;
    public itensSidenav: ObservableArray<any>;
    public isItemVisible: boolean;

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private uiService: UiService,
        private router: RouterExtensions
    ) {
    }

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {

            if (this.drawer) {
                this.drawerComponent.sideDrawer.toggleDrawerState();
            }

        });

        this.itensSidenav = new ObservableArray([

            {
                titulo: 'Datasets Disponíveis', srcIcon: '', expanded: false,
                children: [
                    { titulo: 'Receitas', url: 'execucao-receita', srcIcon: 'res://baseline_ballot_black_24', expanded: false, children: [] },
                    { titulo: 'Despesas', srcIcon: 'res://baseline_attach_money_black_24', expanded: false, children: [] },
                    { titulo: 'Licitações', srcIcon: 'res://baseline_gavel_black_24', expanded: false, children: [] }

                ]
            }

            // {
            //     titulo: 'Receitas', srcIcon: 'res://baseline_ballot_black_24', expanded: false,
            //     children: [
            //         { titulo: 'Execução da Receita (?)', url: 'execucao-receita', srcIcon: '', expanded: false, children: [] },
            //         // { titulo: 'Comparativo Mensal', srcIcon: '', expanded: false, children: [] },
            //         { titulo: 'Lançado x Arrecadado', url: 'lancado-arrecadado', srcIcon: '', expanded: false, children: [] },
            //     ]
            // },
            // {
            //     titulo: 'Despesas', srcIcon: 'res://baseline_attach_money_black_24', expanded: false,
            //     children: [

            //         { titulo: 'Execução da Despesa', url: 'execucao-despesa', srcIcon: '', expanded: false, children: [] },
            //         { titulo: 'Resultado Orçamentário (?)', url: 'resultado-orcamentario', srcIcon: '', expanded: false, children: [] }
            //     ]
            // },
            // {
            //     titulo: 'Licitações', srcIcon: 'res://baseline_gavel_black_24', expanded: false,
            //     children: [
            //         { titulo: 'Processo Licitatório (?)', url: 'processo-licitatorio', srcIcon: '', expanded: false, children: [] }
            //     ]
            // }
        ]);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    templateSelector(item: any, index: number, items: any): string {
        return item.expanded ? "expanded" : "default";
    }

    onItemTap(event: ListViewEventData) {

        console.log(event.object);
        console.log(event.index);
        console.log(event.view.bindingContext);

        const listView = event.object,
            rowIndex = event.index,
            dataItem = event.view.bindingContext;

        dataItem.expanded = !dataItem.expanded;
        if (isAndroid) {
            listView.androidListView.getAdapter().notifyItemChanged(rowIndex);
        }
    }

    chilTap(url: string) {
        console.log(url);
        this.drawerComponent.sideDrawer.toggleDrawerState();
        this.router.navigate(['/' + url]);
    }

}
