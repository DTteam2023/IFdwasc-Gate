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
  selector: 'app-client-connect-cutoff',
  templateUrl: './client-connect-cutoff.component.html',
  styleUrls: ['./client-connect-cutoff.component.scss']
})
export class ClientConnectCutoffComponent implements OnInit {
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
      { title: 'صورة بطاقة العميل', col: 'nationalImg' },
      { title: 'نموذج القطع', col: 'cutOffForm' },
      { title: 'ايصال سداد قيمة القطع', col: 'cutOffValueReceipt' },
    ]
    this.dataSource = this.dt;
  }
  getList(){
    this.appService.GetCutData(this.objData.acc).subscribe((data: any) => {
      if (data.length > 0) { this.db = data[0]; }
      else this.activebtn=true
    })
  }
  openPopUp(row: any) {
    this.objData.acc = this.accountID;
    this.objData.col = row.col;
    let title = 'طلب قطع توصيلة نهائي' + ' - ' + row.title;

    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: this.db[row.col], client: this.objData, typeOrder: 'cutOff' },
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

    this.appService.patchCutOffData(this.objData, object)
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