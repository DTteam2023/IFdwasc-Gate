import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppsService } from 'app/views/apps/apps.service';
import { NgxTablePopupComponent } from '../ngx-table-popup/ngx-table-popup.component';
export interface openAcc {
  title: string;
  col: string;
}

@Component({
  selector: 'app-client-open',
  templateUrl: './client-open.component.html',
  styleUrls: ['./client-open.component.scss']
})
export class ClientOpenComponent implements OnInit {
  dataSource: any = [];
  @Input() accType;
  @Input() accountID;
  @Input() db;
  dt: openAcc[] = [];
  objData = {
    acc: '',
    isNormal: true,
    col: ''
  }
  obj: {}
  activebtn=false
  displayedColumns: string[] = ['title', 'actions'];
  title=''
  constructor(private appService: AppsService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router,
    private confirmService: AppConfirmService
  ) { }
  ngOnInit(): void {
//console.log( this.db );

    if (this.accType == 'normal') {
this.title="حساب رسمي"
      this.dt = [
        { title: 'عقد ملكية أو عقد ايجار', col: 'ownerLeaseContract' },
        { title: 'صورة بطاقة شخصية', col: 'nationalImg' },
        { title: 'وصل مياه للجار', col: 'neighborBill' },
        { title: 'رخصة العقار', col: 'apartmentLicense' },
        { title: 'موافقة المحليات', col: 'mahaliatApproval' },
        { title: 'العقد بين العميل والشركة', col: 'companyCustomerContract' },
        { title: 'اقرار في حالة وجود اكثر من مالك', col: 'moreOwnerAvowal' },
      ]
      this.dataSource = this.dt;
      this.objData.isNormal = true;
      console.log(this.dataSource);
      
    }
    else if (this.accType == 'random') {
      this.title="حساب عشوائي"

      this.dt = [
        { title: 'عقد ملكية أو عقد ايجار', col: 'ownerLeaseContract' },
        { title: 'صورة بطاقة شخصية', col: 'nationalImg' },
        { title: 'وصل مياه للجار', col: 'neighborBill' },
        { title: 'العقد بين العميل والشركة', col: 'companyCustomerContract' },
        { title: 'اقرار في حالة وجود اكثر من مالك', col: 'moreOwnerAvowal' },
      ]
      this.dataSource = this.dt;
      this.objData.isNormal = false;
    }
  }
  getList(){
    this.appService.GetOpBalByAccount(this.accountID)
    .subscribe((data: any) => {
      if (data.length > 0) { this.db = data[0];}
      else this.activebtn=true
    })
  }
  openPopUp(row: any) {
    this.objData.acc = this.accountID;
    this.objData.col = row.col;
    let title = ' طلب فتح حساب -' + row.title;
    console.log(this.db[row.col]);

    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      
      data: { title: title, payload: this.db[row.col], client: this.objData, typeOrder: 'open' },
    })

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
         this.getList();
          return;
        }
      })
  }

  deleteAcc() {
    this.confirmService
    .confirm({ title: "تأكيد الحذف", message: "هل تريد حذف هذا الطلب بالفعل ؟" })
    .subscribe(res => {
      if (res) {
    this.loader.open('جاري الحذف');
    this.objData.acc = this.accountID;
    const object = [{
      "op": "replace",
      "path": '/IsDeleted',
      "value": 'true'
    },
    {
      "op": "replace",
      "path": '/DeletedDate',
      "value": new Date()
    }];

    this.appService.patchOpBal(this.objData, object)
      .subscribe(data => {
        this.dataSource=[]
        this.activebtn=true
        //this.getList();
        this.loader.close();
        this.snack.open('تم الحذف', 'OK', { duration: 2000 })
        //this.router.navigate(['/app/archive']);
      })
    } else return;
  })
}
}