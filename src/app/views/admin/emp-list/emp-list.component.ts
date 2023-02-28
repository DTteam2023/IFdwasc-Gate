import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from 'app/app.services';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { delay, of } from 'rxjs';
import { NgxTablePopupEmpComponent } from '../ngx-table-popup-emp/ngx-table-popup-emp.component';
export interface receipt {
  receiptNo: number;
}
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

displaySPreviewColumns: string[] = ['fullName', 'empCode','userName', 'nationalId','roles','actions'];
items: any[];
dataSource = [];

constructor(private appService: AppService,
  private dialog: MatDialog,
  private loader: AppLoaderService,
  private snack: MatSnackBar,
  private router: Router
) { }

ngOnInit(): void {
  this.getuser();
  
}

getuser(){
  this.appService.GetAllUsers().subscribe((data: any) => {
    if (data.length > 0) { 
      this.dataSource = data    
     //this.items=data
    }
  })
}

openPopUp(data: any = {}) {
  let title = 'تعديل بيانات موظف';
  console.log(data);
  
  let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupEmpComponent, {
    width: '720px',
    disableClose: true,
    data: { title: title, payload: data }
  })
  dialogRef.afterClosed()
    .subscribe(res => {
      this.getuser();

      if(!res) {
        // If user press cancel
        return;
      }
      //this.getuser();
        this.loader.open('جاري التحديث');
        //window.location.reload()

        /*this.updateUser(data.id, res)
          .subscribe(data => {            
            this.dataSource = data;
            this.getuser();
            this.loader.close();
            this.snack.open('تم تحديث بيانات الموظف !', 'OK', { duration: 4000 })
          })*/
      
    })
}
updateUser(id, item) {
  window.location.reload()

  /*this.items = this.items.map(i => {
    if(i.id === id) {
      console.log(Object.assign({}, i, item));
      
      return Object.assign({}, i, item);
    }
    return i;
  })*/
  return of(this.items.slice()).pipe(delay(1000));
}
}
