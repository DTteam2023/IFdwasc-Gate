
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { LayoutService } from 'app/shared/services/layout.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { NavigationService } from 'app/shared/services/navigation.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { getQueryParam } from 'app/shared/helpers/url.helper';
import { LocalStoreService } from 'app/shared/services/local-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"],
  animations: egretAnimations
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  public mainVersion;
  selectedMenu = 'defaultMenu';

  /****** Only for demo) **********/
  public Apps: any[] = [
    {
      name: 'برنامج أرشفة ملفات العملاء',
      photo: 'assets/ServicesList/archive.jpg',
      dest: 'app/archive',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "slate",
        "topbarColor": "white",
        "footerColor": "slate",
        "dir": "rtl",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy",
        "appName":"archive"
      }`
    }, 
    {
      name: 'برنامج مركز المعلومات',
      photo: 'assets/ServicesList/InfoCenter.jpg',
      dest: 'app/InfoCenter',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy",
        "appName":"infoCenter"
      }`
    },
    {
      name: 'برنامج السلامة والصحة المهنية',
      photo: 'assets/ServicesList/secrity.jpg',
      dest: 'app/Secrity',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy-dark",
        "appName":"archive"
      }`
    },
    {
      name: 'برنامج الرعاية الصحية',
      photo: 'assets/ServicesList/healthcare.jpg',
      dest: 'app/healthcare',
      conf: `{
        "navigationPos": "side",
        "sidebarStyle": "full",
        "sidebarColor": "white",
        "topbarColor": "white",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": true,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy",
        "appName":"archive"
      }`
    },

  ]

  public Services: any[] = [
    {
      name: 'الرعاية الصحية',
      photo: 'assets/ServicesList/healthcare.jpg',
      dest: 'servicelist/healthcare',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy",
        "appName":"healthcare"
      }`
    }, 
    {
      name: ' العهدة الشخصية',
      photo: 'assets/ServicesList/list.jpg',
      dest: 'servicelist/ohda',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy",
        "appName":"ohda"
      }`,      
    },
    {
      name: 'تقرير كفاءة العاملين',
      photo: 'assets/ServicesList/rating.jpg',
      dest: 'servicelist/empEfficiency',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy"
      }`,      
    },
  ]

  Compstructure=[
    {
      name:'الهيكل الداخلي للشركة',
      dest: 'hierarchy/it',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy"
      }`,      
    },
    {
      name:'الادارة العامة لتكنولوجيا المعلومات',
      dest: 'hierarchy/it',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy"
      }`,      
    },
    {
      name:'الادارة العامة للأمن',
      dest: 'hierarchy/it',
      conf: `{
        "navigationPos": "top",
        "sidebarStyle": "compact",
        "sidebarColor": "slate",
        "topbarColor": "slate",
        "footerColor":"slate",
        "dir": "rtl",
        "useBreadcrumb": false,
        "topbarFixed": false,
        "breadcrumb": "simple",
        "matTheme": "egret-navy"
      }`,      
    },
  ];

  structure=this.Compstructure[0];
  // private homePS: PerfectScrollbar;
  constructor(
    private router: Router,
    private loader: AppLoaderService,
    public layout: LayoutService,
    private navService: NavigationService,
    private ls: LocalStoreService,

  ) { }

  ngOnInit() {
    this.mainVersion = this.Apps[0]
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
     //  this.homePS = new PerfectScrollbar('.scrollable')
    // });
  }
 
  /****** Remove this (Only for demo) **********/
  goToDashboard(v) {
    let origin = window.location.origin;
    this.ls.setItem('app', JSON.parse(v.conf).appName);

    window.location.href = `${origin}/${v.dest}/?layout=${v.conf}`;
   // console.log( JSON.parse(getQueryParam('layout')).appName);
 }

  getHirarchy(v) {
    //console.log("kjhk");
    
    //let origin = window.location.origin;
    //window.location.href = `${origin}/${v.dest}/?layout=${v.conf}`;

  }

  goToMainDash() {
    this.loader.open();
    this.router.navigateByUrl('/dashboard/analytics')
  }

}
