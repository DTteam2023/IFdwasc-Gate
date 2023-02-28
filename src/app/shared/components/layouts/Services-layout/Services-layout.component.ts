import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { 
  Router, 
  NavigationEnd, 
  RouteConfigLoadStart, 
  RouteConfigLoadEnd, 
  ResolveStart, 
  ResolveEnd 
} from '@angular/router';
import { Subscription } from "rxjs";
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { LayoutService } from '../../../services/layout.service';
import { filter } from 'rxjs/operators';
import { JwtAuthService } from '../../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-sevice-layout',
  templateUrl: './Services-layout.template.html',
})
export class ServiceLayoutComponent implements OnInit, AfterViewInit {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;

  public  scrollConfig = {}
  public layoutConf: any = {};
  public adminContainerClasses: any = {};
  
  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService
  ) {
    // Check Auth Token is valid
    this.jwtAuth.checkTokenIsValid().subscribe();

    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange: NavigationEnd) => {
      this.layout.adjustLayout({ route: routeChange.url });
      this.scrollToTop();
    });
    
    // Translator init
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // this.layoutConf = this.layout.layoutConf;
    //this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
     //   this.layoutConf = layoutConf;
        // console.log(this.layoutConf);
        this.layoutConf={
          navigationPos: 'top', // side, top
          sidebarStyle: 'full', // full, compact, closed
          sidebarColor: 'slate', // http://demos.ui-lib.com/egret-doc/#egret-colors
          sidebarCompactToggle: false, // applied when "sidebarStyle" is "compact"
          dir: 'rtl', // ltr, rtl
          useBreadcrumb: false,
          topbarFixed: false,
          footerFixed: false,
          topbarColor: 'white', // http://demos.ui-lib.com/egret-doc/#egret-colors
          footerColor: 'slate', // http://demos.ui-lib.com/egret-doc/#egret-colors
          matTheme: 'egret-navy', // egret-navy, egret-navy-dark
          breadcrumb: 'simple', // simple, title
          perfectScrollbar: true,
          appName:''
        }
       this.adminContainerClasses = this.updateAdminContainerClasses(this.layoutConf);
        this.cdr.markForCheck();
   // });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if(event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }
  
  ngAfterViewInit() {

  }
  
  scrollToTop() {
    if(document) {
      setTimeout(() => {
        let element;
        if(this.layoutConf.topbarFixed) {
          element = <HTMLElement>document.querySelector('#rightside-content-hold');
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      })
    }
  }
  ngOnDestroy() {
    if(this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if(this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  sidebarMouseenter(e) {
    // console.log(this.layoutConf);
    if(this.layoutConf.sidebarStyle === 'compact') {
        this.layout.publishLayoutChange({sidebarStyle: 'full'}, {transitionClass: true});
    }
  }

  sidebarMouseleave(e) {
    // console.log(this.layoutConf);
    if (
        this.layoutConf.sidebarStyle === 'full' &&
        this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({sidebarStyle: 'compact'}, {transitionClass: true});
    }
  }

  updateAdminContainerClasses(layoutConf) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact': layoutConf.sidebarStyle === 'compact' && layoutConf.navigationPos === 'top',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big': layoutConf.sidebarStyle === 'compact-big' && layoutConf.navigationPos === 'top',
      'sidebar-opened': layoutConf.sidebarStyle !== 'closed' && layoutConf.navigationPos === 'top',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar': layoutConf.topbarFixed && layoutConf.navigationPos === 'top'
    }
  }
  
}