import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'app/app.services';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
interface Center {
  centerId: number;
  centerName: string;
}
interface Role {
  id: number;
  name: string;
}
@Component({
  selector: 'app-ngx-table-popup-emp',
  templateUrl: './ngx-table-popup-emp.component.html',
  styleUrls: ['./ngx-table-popup-emp.component.scss']
})
export class NgxTablePopupEmpComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  centers: Center[]
  roles: Role[]

  object = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTablePopupEmpComponent>,
    private fb: UntypedFormBuilder,
    private appService: AppService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.appService.GetCenters().subscribe((data) => {
      this.centers = data
    });
    this.appService.GetallRoles().subscribe((data) => {
      this.roles = data
    });
    console.log(this.data.payload);

    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      username: [item.userName || '', Validators.required],
      NationalId: [item.nationalId || ''],
      centerID: [item.centerId || ''],
      roleID: [item.roles || ''],
    })
  }

  submit() {
    //this.loader.open('جاري التحديث');
    this.object = [{
      "op": "replace",
      "path": '/userName',
      "value": this.itemForm.get('username').value
    },
    {
      "op": "replace",
      "path": '/nationalId',
      "value": this.itemForm.get('NationalId').value
    }, {
      "op": "replace",
      "path": '/centerId',
      "value": this.itemForm.get('centerID').value
    }
      , {
      "op": "replace",
      "path": '/roles',
      "value": this.itemForm.get('roleID').value
    }
    ];

    this.appService.patchUsers(this.data.payload.id, this.object)
      .subscribe(data => {
        this.loader.close();
        this.snack.open('تم الحفظ', 'OK', { duration: 4000 });
        this.dialogRef.close();
        //this.router.navigate(['/app/archive']);
      })


    this.dialogRef.close(this.itemForm.value)
  }
}
