import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppsService } from 'app/views/apps/apps.service';
import { NgxTablePopupComponent } from '../ngx-table-popup/ngx-table-popup.component';
export interface receipt {
  receiptId: number;
}

@Component({
  selector: 'app-client-preview',
  templateUrl: './client-preview.component.html',
  styleUrls: ['./client-preview.component.scss']
})
export class ClientPreviewComponent implements OnInit {
  displaySPreviewColumns: string[] = ['receiptId', 'receipt', 'assay', 'actions'];
  @Input() previewType;
  @Input() accountID;
  @Input() db;
  colName={
    wCheckValueReceipt:'ايصال سداد قيمة المعاينة',
    wMaintenanceValue:'مقايسة الصيانة'
  }
  dataSource: receipt[] = [];
  objData = {
    acc: '',
    isWater: false,
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
    if (this.previewType == 'sewer')
      this.objData.isWater = false;
    else if (this.previewType == 'water')
      this.objData.isWater = true
  }
  getList(){
    if (this.objData.isWater) {
      this.appService.GetReceiptCheckData(this.accountID, true).subscribe((data: any) => {
        if (data.length > 0) {
          this.dataSource = data;
        }
      })
    }
    else if (!this.objData.isWater) {
      this.appService.GetReceiptCheckData(this.accountID, false).subscribe((data: any) => {
        if (data.length > 0) {
          this.dataSource = data;
        }
      })
    }
  }
  openPopUp(data: any, col: any,colname:any) {
    this.objData.acc = this.accountID;
    this.objData.receipt = data;
    this.objData.col = data;

    let title = '';

    if (this.objData) {
      if (this.objData.isWater)
      title = ' معاينة المياه '  + ' - ' + colname +'  برقم ايصال ' + data;
      else if (!this.objData.isWater) 
        title = ' معاينة الصرف '  + ' - ' + colname +'  برقم ايصال ' + data;
      this.objData.col = col
      this.appService.GetAllPicCheckData(this.objData).subscribe((obj: any) => {
        data = obj
        let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
          width: '720px',
          disableClose: true,
          data: { title: title, payload: data, client: this.objData, typeOrder: 'preview' },
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
          this.appService.patchCheckData(this.objData, object).subscribe(data => {
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
