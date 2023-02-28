import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getQueryParam } from '../helpers/url.helper';
import { LocalStoreService } from './local-store.service';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  defaultMenu: IMenuItem[] = [
    {
      name: 'الادمن',
      type: 'link',
      icon: 'account_box',
      state: 'admin',
      disabled:true
    },
    {
      name: 'التطبيقات',
      type: 'link',
      icon: 'apps',
      state: 'others/blank',
      disabled:false

    },
    {
      name: 'الخدمات',
      type: 'link',
      icon: 'dashboard',
      state: 'others/blank',      
      disabled:false

    },
    {
      name: 'الهيكل الداخلي للشركة',
      type: 'dropDown',
      icon: 'location_city',
      state: 'hierarchy',
      disabled:false,
      sub: [
        { name: 'الادارة العامة لتكنولوجيا المعلومات', state: 'hierarchy/IT' },
        { name: 'الادارة العامة للشئون القانونية', state: 'hierarchy/IT' },
        { name: 'الادارة العامة للأمن', state: 'hierarchy/IT' },
        { name: 'الادارة العامة للمكتب الفني', state: 'hierarchy/IT' }
      ]
    },
    {
      name: 'الصفحة الرئيسية',
      type: 'link',
      icon: 'home',
      state: 'home',
      disabled:false

    }



    //{
     // name: 'DOC',
    //  type: 'extLink',
     // tooltip: 'Documentation',
     // icon: 'library_books',
    //  state: 'http://demos.ui-lib.com/egret-doc/'
    //}
  ];

  archiveMenu: IMenuItem[] = [
    {
      name: 'ملف العميل',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/Search'
    },
    {
      name: 'طلب فتح حساب',
      type: 'dropDown',
      icon: 'library_books',
      sub: [
        { name: 'حساب رسمي', state: 'app/archive/open/normal' },
        { name: 'حساب عشوائي', state: 'app/archive/open/random' },
      ]
    },
    {
      name: 'طلب معاينة',
      type: 'dropDown',
      icon: 'library_books',
      sub: [
        { name: 'طلب معاينة مياه', state: 'app/archive/preview/water' },
        { name: 'طلب معاينة صرف', state: 'app/archive/preview/sewer' },
      ]
    },   
    {
      name: 'طلب توفير',
      type: 'dropDown',
      icon: 'library_books',
      sub: [
        { name: 'طلب توفير مياه', state: 'app/archive/saving/water' },
        { name: 'طلب توفير صرف', state: 'app/archive/saving/sewer' },
      ]
    },
    {
      name: 'طلب نقل الملكية',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/conveyance'
    },
    {
      name: 'طلب فحص العداد',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/CounterCheck'
    },
    {
      name: 'طلب قطع توصيله نهائي',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/ConnectCut'
    },
    {
      name: 'طلب شهادة بيانات للعميل',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/DataCertificate'
    },
    {
      name: 'طلب كشف حساب للعميل',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/AccountState'
    },
    {
      name: 'ملف عداد مسروق',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/CounterStole'
    },
    {
      name: 'طلب فرق المقايسة',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/AssayDiff'
    },
    {
      name: 'تحويل الحساب من عشوائي لرسمي',
      type: 'link',
      icon: 'library_books',
      state: 'app/archive/ConvertAcc'
    },
  ];
  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  title='';
  logo='';
  // sets iconMenu as default;
 
  menuItems ;
  menuItems$ ;
  // navigation component has subscribed to this Observable
  constructor(private ls: LocalStoreService) {
    this.publishNavigationChange(this.ls.getItem('app'));
   
   }

  
  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  // PLEASE VIEW THE EGRET FULL VERSION CODE

  publishNavigationChange(menuType: string) {
    //console.log(menuType)
    switch (menuType) {
      case 'defaultMenu':
        this.menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
        this.menuItems$ = this.menuItems.asObservable();

        break;
        case 'archive':
        this.menuItems = new BehaviorSubject<IMenuItem[]>(this.archiveMenu);
        this.menuItems$ = this.menuItems.asObservable();
        this.title="برنامج أرشفة ملفات العملاء";
        this.logo="assets/ServicesList/folder-icon.png"
        break;
        default:
        this.menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
        this.menuItems$ = this.menuItems.asObservable();
        break;
     
    }}}