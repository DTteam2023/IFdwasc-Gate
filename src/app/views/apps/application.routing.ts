import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { AccConvertComponent } from './Archive/acc-convert/acc-convert.component';
import { AccOpenComponent } from './Archive/acc-open/acc-open.component';
import { AccountStateComponent } from './Archive/account-state/account-state.component';
import { AssayDiffComponent } from './Archive/assay-diff/assay-diff.component';
import { ClientArchiveComponent } from './Archive/client-archive/client-archive.component';
import { ArchiveSearchComponent } from './Archive/client-files/archive-search/archive-search.component';
import { ConnectCutComponent } from './Archive/connect-cut/connect-cut.component';
import { ConveyanceComponent } from './Archive/conveyance/conveyance.component';
import { CounterCheckComponent } from './Archive/counter-check/counter-check.component';
import { CounterStoleComponent } from './Archive/counter-stole/counter-stole.component';
import { DataCertificateComponent } from './Archive/data-certificate/data-certificate.component';
import { PreviewComponent } from './Archive/preview/preview.component';
import { SavingComponent } from './Archive/saving/saving.component';


export const AppsRoutes: Routes = [
    {
        path: 'archive',
        component: ClientArchiveComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'أرشفة ملفات العملاء', breadcrumb: 'clients' ,roles:["Arch","Admin"]},
    },
    {
        path: 'archive/open',
        children: [
            {
              path: 'normal',
              component: AccOpenComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب فتح حساب رسمي', breadcrumb: 'open' ,roles:["Arch","Admin"]}
            },
            {
              path: 'random',
              component: AccOpenComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب فتح حساب عشوائي', breadcrumb: 'open' ,roles:["Arch","Admin"]}
            }
        ]
    },
    {
        path: 'archive/preview',
        children: [
            {
              path: 'water',
              component: PreviewComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب معاينةالمياه', breadcrumb: 'water' ,roles:["Arch","Admin"]},
            },
            {
              path: 'sewer',
              component: PreviewComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب معاينةالصرف', breadcrumb: 'sewer' ,roles:["Arch","Admin"]},
            }
        ]
    },

    {
        path: 'archive/saving',
        children: [
            {
              path: 'water',
              component: SavingComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب توفير المياه', breadcrumb: 'water' ,roles:["Arch","Admin"]},
            },
            {
              path: 'sewer',
              component: SavingComponent,
              canActivate: [AuthGuard,UserRoleGuard],
              data: { title: 'طلب توفيرالصرف', breadcrumb: 'sewer' ,roles:["Arch","Admin"]},
            }
        ]
    },

    {
        path: 'archive/conveyance',
        component: ConveyanceComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب نقل الملكية', breadcrumb: 'conveyance' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/CounterCheck',
        component: CounterCheckComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب فحص العداد', breadcrumb: 'CounterCheck' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/ConnectCut',
        component: ConnectCutComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب قطع توصيله نهائي', breadcrumb: 'ConnectCut' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/DataCertificate',
        component: DataCertificateComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب شهادة بيانات للعميل', breadcrumb: 'DataCertificate' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/AccountState',
        component: AccountStateComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب كشف حساب للعميل', breadcrumb: 'AccountState' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/CounterStole',
        component: CounterStoleComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'ملف عداد مسروق', breadcrumb: 'CounterStole' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/AssayDiff',
        component: AssayDiffComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'طلب فرق المقايسة', breadcrumb: 'AssayDiff' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/Search',
        component: ArchiveSearchComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'ملف العميل', breadcrumb: 'search' ,roles:["Arch","Admin"]}
    },
    {
        path: 'archive/ConvertAcc',
        component: AccConvertComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: { title: 'تحويل الحساب', breadcrumb: 'ConvertAcc' ,roles:["Arch","Admin"]}
    },
    
];
