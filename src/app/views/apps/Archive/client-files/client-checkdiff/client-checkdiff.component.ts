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
  selector: 'app-client-checkdiff',
  templateUrl: './client-checkdiff.component.html',
  styleUrls: ['./client-checkdiff.component.scss']
})
export class ClientCheckdiffComponent implements OnInit {
  displaySPreviewColumns: string[] = ['receiptNo', 'CheckFile', 'ReceiptImg', 'actions'];
  @Input() previewType;
  @Input() accountID;
  @Input() db;
colName={
  checkFile:'مستند المعاينة',
  receiptImg:'ايصال سداد قيمة فرق المقايسة'
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
    this.appService.GetCheckDDataObjects(this.accountID).subscribe((data: any) => {
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

    title = ' فرق المقايسة ' + ' - ' + colname +'  برقم ايصال ' + data;
    this.appService.GetAllPicCheckDData(this.objData).subscribe((obj: any) => {
      data = obj

      let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
        width: '720px',
        disableClose: true,
        data: { title: title, payload: data, client: this.objData, typeOrder: 'checkdiff' },

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
          this.appService.patchCheckDData(this.objData, object).subscribe(data => {
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

