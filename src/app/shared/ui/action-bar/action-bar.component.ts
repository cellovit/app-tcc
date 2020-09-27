import { Component, OnInit, Inject, Input } from '@angular/core';
import { isAndroid, Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UiService } from '../service/ui.service';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  @Input() title: string;
  @Input() showBandeira: boolean = false;

  constructor(
    private page: Page,
    private router: RouterExtensions,
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  onNavBtnTap() {
    console.log("Navigation button tapped!");
  }

  onLoadedActionBar() {

    if (isAndroid) {

      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();

      if (backButton) {
        console.log(backButton);

        backButton.setColorFilter(
          android.graphics.Color.parseColor('#000000'),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        )
      }
    }

  }

  get canGoBack() {
    return this.router.canGoBack();
  }

  onGoBack() {
    this.router.backToPreviousPage
  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }

}
