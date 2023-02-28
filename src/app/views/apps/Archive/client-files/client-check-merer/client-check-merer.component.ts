import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppsService } from 'app/views/apps/apps.service';
import { NgxTablePopupComponent } from '../ngx-table-popup/ngx-table-popup.component';
export interface receipt {
  receiptNo: number;
}

@Component({
  selector: 'app-client-check-merer',
  templateUrl: './client-check-merer.component.html',
  styleUrls: ['./client-check-merer.component.scss']
})
export class ClientCheckMererComponent implements OnInit {
  displaySPreviewColumns: string[] = ['receiptNo', 'CheckForm', 'CheckValueReceipt', 'actions'];
  @Input() previewType;
  @Input() accountID;
  @Input() db;
colName={
  checkForm:'نموذج الفحص',
  checkValueReceipt:'ايصال سداد قيمة الفحص'
}
  dataSource: receipt[] = [];
  objData = {
    acc: '',
    receipt: '',
    col: ''
  }
  constructor(private appService: AppsService,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router,
    private confirmService: AppConfirmService
  ) { }

  ngOnInit(): void {
    this.dataSource = this.db;
  }
  getList(){
    this.appService.GetCheckMeterDataObjects(this.accountID).subscribe((data: any) => {
      if (data.length > 0) {
        this.dataSource = data;
      }
    })
  }
  openPopUp(data: any, col: any,colname:any) {
    this.objData.acc = this.accountID;
    this.objData.receipt = data;
    this.objData.col = col

    let title = '';

    title = ' فحص العداد ' + ' - ' + colname +'  برقم ايصال ' + data;
    ////////////////// will change
    this.appService.GetAllPicCheckMeterData(this.objData).subscribe((obj: any) => {
      data = obj

      let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
        width: '720px',
        disableClose: true,
        data: { title: title, payload: data, client: this.objData, typeOrder: 'checkMeter' },

      })

      dialogRef.afterClosed()
        .subscribe(res => {
          if (!res) {
            this.getList();
            return;
          }
        })
    })
  }

  deleteReceipt(row) {
    this.confirmService
      .confirm({ title: "تأكيد الحذف", message: "هل تريد حذف هذا الايصال بالفعل ؟" })
      .subscribe(res => {
        if (res) {
          this.loader.open('جاري الحذف');
          this.objData.acc = this.accountID;
          this.objData.receipt = row;
      
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
          this.appService.patchCheckMeterData(this.objData, object)
            .subscribe(data => {
              this.dataSource=[]
              this.getList();
              this.loader.close();
              this.snack.open('تم الحذف', 'OK', { duration: 2000 })
              //this.router.navigate(['/app/archive']);
            })
        } else return;
      });


  }
}

