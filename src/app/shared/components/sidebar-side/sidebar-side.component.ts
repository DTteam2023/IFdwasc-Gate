import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { ActivatedRoute } from "@angular/router";
import { getQueryParam } from "app/shared/helpers/url.helper";
import { HttpParams } from "@angular/common/http";
import { LocalStoreService } from "app/shared/services/local-store.service";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html",
  styleUrls: ['./sidebar-side.component.scss']
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  title;
  logo;
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    public jwtAuth: JwtAuthService,
    private router: ActivatedRoute,
    private ls: LocalStoreService,
  ) { }

  ngOnInit() {
    //console.log(JSON.parse(getQueryParam('layout')));
    if(this.ls.getItem('app')!=''||this.ls.getItem('app')==undefined)
    this.navService.publishNavigationChange(this.ls.getItem('app'));

    //this.navService.publishNavigationChange(JSON.parse(getQueryParam('layout')).appName);
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.title = this.navService.title;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      this.logo = this.navService.logo;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => { item.type === "icon" }

      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() { }
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }
}
