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
  selector: 'app-client-conveyance',
  templateUrl: './client-conveyance.component.html',
  styleUrls: ['./client-conveyance.component.scss']
})
export class ClientConveyanceComponent implements OnInit {
  dataSource: any = [];
  @Input() accountID;
  @Input() db;
  dt: openAcc[] = [];
  objData = {
    acc: '',
    col: ''
  }
  obj: {}
  activebtn=false
  displayedColumns: string[] = ['title', 'actions'];
  constructor(private appService: AppsService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router,
    private confirmService: AppConfirmService
  ) { }
  ngOnInit(): void {

    this.dt = [
      { title: 'عقد بيع العقار', col: 'apartmentSaleContract' },
      { title: 'صورة بطاقة العميل الاصلي', col: 'oldNationalId' },
      { title: 'صورة بطاقة العميل الجديد', col: 'newNationalId' },
      { title: 'مستند التنازل أو صحة التوقيع', col: 'signatureAuthenticity' },
      { title: 'ايصال سداد قيمة نقل الملكية', col: 'transferValueReciept' },
      { title: 'اقرار', col: 'avwal' },
      { title: 'تفويض', col: 'tDelegation' },
    ]
    this.dataSource = this.dt;
  }
  getList(){
    this.appService.GetTransOwnerData(this.objData.acc)
    .subscribe((data: any) => {
      if (data.length > 0) { this.db = data[0]; }
      else this.activebtn=true
    })
  }
  openPopUp(row: any) {
    this.objData.acc = this.accountID;
    this.objData.col = row.col;
    let title = 'طلب نقل ملكية' + ' - '  + row.title;

    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: this.db[row.col], client: this.objData, typeOrder: 'convyance' },
    })

    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
         this. getList();
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

    this.appService.patchTransOwnerData(this.objData, object)
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