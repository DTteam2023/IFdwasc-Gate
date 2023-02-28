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
  selector: 'app-acc-convert',
  templateUrl: './acc-convert.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class AccConvertComponent implements OnInit {
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  userData = {
    AccountId: 0,
    AccountName: '',
    ApartmentLicense: '',
    MahaliatApproval: ''
  }
  name: '';
  isNormal = true;
  openType = ''
  isExist = true;
  objData = {
    acc: 0,
    isNormal: false,
    col: ''
  }
  constructor(private fb: UntypedFormBuilder,
    private appService: AppsService,
    private Service: AppService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private imageCompress: NgxImageCompressService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      ApartmentLicense: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      MahaliatApproval: ['', Validators.required],
    });

    window.localStorage.setItem('images', '');
    window.localStorage.setItem('btnID', '');
  }

  onKey(event: any) { // without type info
    this.isExist = false;
    this.name = ''
    this.Service.loadDataClient(this.Service.centerId).subscribe((data) => {
      const emp = data.filter(d => d.CUSTKEY == event.target.value);  
      console.log(emp);
          
      if (emp.length > 0) {
        this.name = emp[0]['SURNAME'];
        this.userData.AccountName = this.name;
        this.checkFoundAcc(event.target.value);
      }
    });
  }
  checkFoundAcc(acc: any) {
    this.appService.GetOpBalByAccount(acc).subscribe((data) => {
      console.log(data);
      
      if (data.length != 0) {
        console.log(data.length);
        
        //this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        this.appService.GetOpBal(acc, false).subscribe((data) => {
          if(data.length!=0){
          this['firstFormGroup'].controls['AccountId'].setValue(acc);
          this['firstFormGroup'].controls['AccountName'].setValue(this.name);

          this.isExist = true;}
          else this.isExist=false;
        })
        }
      
      else
        this.isExist = false;
    });
  }
  submit() {

    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.ApartmentLicense = (document.getElementById('ApartmentLicenseImg') as HTMLImageElement).src
    this.userData.MahaliatApproval = (document.getElementById('MahaliatApprovalImg') as HTMLImageElement).src

    this.loader.open('جاري التحويل');
    this.objData.acc = this.userData.AccountId;
    const object = [
      {
        "op": "replace",
        "path": '/ApartmentLicense',
        "value": this.userData.ApartmentLicense
      },
      {
        "op": "replace",
        "path": '/MahaliatApproval',
        "value": this.userData.MahaliatApproval
      },
      {
        "op": "replace",
        "path": '/IsNormalAccount',
        "value": true
      }
    ];
    console.log(this.objData);

    this.appService.patchOpBal(this.objData, object)
      .subscribe(data => {
        this.loader.close();
        this.snack.open('تم التحويل', 'OK', { duration: 4000 })
        //this.router.navigate(['/app/archive']);
        window.location.reload()

      })
  }

  compressFile(parm: any, fgroup?: any) {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {
        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
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

    if (fgroup != '')
      this[fgroup].controls[parm].setValue(img);
  }
}