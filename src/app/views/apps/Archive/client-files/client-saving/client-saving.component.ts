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
  selector: 'app-client-saving',
  templateUrl: './client-saving.component.html',
  styleUrls: ['./client-saving.component.scss']
})
export class ClientSavingComponent implements OnInit {
  dataSource: any = [];
  @Input() saveType;
  @Input() accountID;
  @Input() db;
  dt: openAcc[] = [];
  objData = {
    acc: '',
    isWater: true,
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

    if (this.saveType == 'water') {
      this.dt = [
        { title: 'مستند حساب قيمة المقايسة', col: 'fileOfCalcCheck' },
        { title: 'ايصال سداد قيمة توفير المياه', col: 'billReceipt' },
        { title: 'ايصال سداد قيمة الشحن', col: 'waterChargeValueReceipt' },
        { title: 'ايصال غرامة', col: 'waterGharamaReceipt' },
      ]
      this.dataSource = this.dt;
      this.objData.isWater = true;
    }
    else if (this.saveType == 'sewer') {
      this.dt = [
        { title: 'مستند حساب قيمة المقايسة', col: 'fileOfCalcCheck' },
        { title: 'ايصال سداد قيمة توفير الصرف', col: 'billReceipt' },
      ]
      this.dataSource = this.dt;
      this.objData.isWater = false;
    }
  }
  getList(){
    if (this.objData.isWater) {
      this.appService.GetSupplyData(this.accountID, true).subscribe((data: any) => {
        if (data.length > 0) { this.db = data[0] }
        else this.activebtn=true
      })
    }
    else if (!this.objData.isWater) {
      this.appService.GetSupplyData(this.accountID, false).subscribe((data: any) => {
        if (data.length > 0) { this.db = data[0] }
        else this.activebtn=true
      })
    }
  }
  openPopUp(row: any) {
    this.objData.acc = this.accountID;
    this.objData.col = row.col;
    let title = '';

    if (this.objData.isWater)
      title = 'طلب توفير المياه' + ' - ' + row.title;

    else if (!this.objData.isWater)
      title = 'طلب توفير الصرف' + ' - ' + row.title;

    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: this.db[row.col], client: this.objData, typeOrder: 'saving' },
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

    this.appService.patchSupplyData(this.objData, object)
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