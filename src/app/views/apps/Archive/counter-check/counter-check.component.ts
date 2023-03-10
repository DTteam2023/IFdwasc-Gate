import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.services';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import '../../../../../assets/scanner.js';
import { AppsService } from '../../apps.service';

@Component({
  selector: 'app-counter-check',
  templateUrl: './counter-check.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class CounterCheckComponent implements OnInit {

  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  myGroup: UntypedFormGroup
  userData = {
    AccountId: 0,
    AccountName: '',
    CheckForm: '',
    CheckValueReceipt: '',
    UserID: '',
    CenterId: 0,
    CreatedDate: new Date(),
    ReceiptNo: 0,
    Comment: ''
  }
  selectedFiles?: FileList;
  currentFile: File;
  name: '';
  isExist = false;
  objData = {
    acc: 0,
    receipt: ''
  }
  constructor(private fb: UntypedFormBuilder,
    private appService: AppsService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private imageCompress: NgxImageCompressService,
    private route: ActivatedRoute,
    private router: Router,
    private Service: AppService) {
      this.userData.UserID=this.Service.user.id;
      this.userData.CenterId = this.Service.centerId;    
    }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required],
      ReceiptNo: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      CheckForm: ['', Validators.required],

    });
    this.thirdFormGroup = this.fb.group({
      CheckValueReceipt: ['', Validators.required],
    });
    this.myGroup = this.fb.group({
      Note: ['']
    });
    window.localStorage.setItem('images', '');
    window.localStorage.setItem('btnID', '');
  }

  onKey(event: any) { // without type info
    this.name = ''
    this.Service.loadDataClient(this.Service.centerId).subscribe((data) => {
      const emp = data.filter(d => d.CUSTKEY == event.target.value);      
      if (emp.length > 0) {
        this.name = emp[0]['SURNAME'];
        this.userData.AccountName = this.name;
        //this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        //this['firstFormGroup'].controls['AccountId'].setValue(event.target.value);

      }
    });
  }
  onKeyReceipt(event: any) { // without type info
    this.isExist = false;

    if (this.firstFormGroup.get('AccountId').value != '') {
      this.objData = {
        acc: Number(this.firstFormGroup.get('AccountId').value),
        receipt: event.target.value
      }

      this.appService.GetChecMeter(event.target.value).subscribe((data) => {
        if (data.length == 0) {
          this.userData.ReceiptNo = event.target.value;
          this.isExist = false;
          this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        }
        else
          this.isExist = true;
      });

    }
    else {
      alert("???????? ?????? ???????????? ????????");
      event.target.value = ''
    }
  }

  submit() {
    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.CheckForm = (document.getElementById('CheckFormImg') as HTMLImageElement).src
    this.userData.CheckValueReceipt = (document.getElementById('CheckValueReceiptImg') as HTMLImageElement).src
    this.userData.Comment = this.myGroup.get('Note').value

    if (this.userData) {
      this.loader.open('?????????? ?????? ?????? ????????????');
      this.appService.PostCheckMeterData(this.userData)
        .subscribe(data => {
          this.loader.close();
          this.snack.open('???? ??????????', 'OK', { duration: 2000 })
          //this.router.navigate(['/app/archive']);
          window.location.reload()

        })
    }
  }

  compressFile(parm: any, btnId: any, fgroup: any) {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {
        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              const el: HTMLElement = document.getElementById(btnId);
              el.removeAttribute('disabled')
              this.userData[parm] = compressedImage;
              if (fgroup != null)
              this[fgroup].controls[parm].setValue('image');
            }
          );
      }
    );
  }

  scan(fgroup: any, parm: any, img: any, btnId: any) {

    const el: HTMLElement = document.getElementById(btnId);
    el.setAttribute('disabled', '')

    this.appService.ScanToJpg();
    window.localStorage.setItem('images', img);
    window.localStorage.setItem('btnID', btnId);

    this[fgroup].controls[parm].setValue(img);
  }

}