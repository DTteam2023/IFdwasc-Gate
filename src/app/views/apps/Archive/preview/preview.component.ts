import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import '../../../../../assets/scanner.js';
import { NgxImageCompressService } from "ngx-image-compress";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AppsService } from '../../apps.service';
import { AppService } from 'app/app.services';

declare let scanner: any;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class PreviewComponent implements OnInit {
  @HostListener('window:storage')

  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  userData = {
    AccountId: 0,
    AccountName: '',
    WCheckValueReceipt: '',
    WMaintenanceValue: '',
    UserID: '',
    CenterId: 0,
    CreatedDate: new Date(),
    IsWater: false,
    ReceiptId: 0
  }
  selectedFiles?: FileList;
  currentFile: File;
  name: '';
  previewType;
  iswater = true;
  isExist = false;
  objData = {
    acc: 0,
    isWater: false,
    receipt: ''
  }
  user;
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
    this.previewType = this.route.snapshot.url[0].path;

    if (this.previewType == 'water') this.iswater = true
    if (this.previewType == 'sewer') this.iswater = false

    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required],
      ReceiptId: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      WCheckValueReceipt: ['', Validators.required],

    });
    this.thirdFormGroup = this.fb.group({
      WMaintenanceValue: ['', Validators.required],
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
      }
    });
  }
  onKeyReceipt(event: any) { // without type info
    this.isExist = false;

    if (this.firstFormGroup.get('AccountId').value != '') {
      this.objData = {
        acc: Number(this.firstFormGroup.get('AccountId').value),
        isWater: this.iswater,
        receipt: event.target.value
      }

      this.appService.GetCheckData(event.target.value).subscribe((data) => {
        console.log(data);
        
        if (data.length == 0) {
          this.userData.ReceiptId = event.target.value;
          this.isExist = false;
          this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        }
        else
          this.isExist = true;
      });

    }
    else {
      alert("ادخل رقم الحساب اولا");
      event.target.value = ''
    }
  }

  submit() {
    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.WCheckValueReceipt = (document.getElementById('WCheckValueReceiptImg') as HTMLImageElement).src
    this.userData.WMaintenanceValue = (document.getElementById('WMaintenanceValueImg') as HTMLImageElement).src
    //console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(this.userData.WCheckValueReceipt));

    if (this.userData) {
      if (this.iswater) {
        this.loader.open('اضافة طلب معاينة المياه');
        this.userData.IsWater = true
        this.appService.PostCheckData(this.userData)
          .subscribe(data => {
            this.loader.close();
            this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
            //this.router.navigate(['/app/archive']);
            window.location.reload()

          })
      }
      else if (!this.iswater) {
        this.loader.open('اضافة طلب معاينة الصرف');
        this.userData.IsWater = false
        this.appService.PostCheckData(this.userData)
          .subscribe(data => {
            this.loader.close();
            this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
            //this.router.navigate(['/app/archive']);
            window.location.reload()

          })
      }
    }
  }

  compressFile(parm: any, btnId: any, fgroup: any) {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {
        //this.imgResultBeforeCompression = image;
        //console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));
        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              const el: HTMLElement = document.getElementById(btnId);
              el.removeAttribute('disabled')
              this.userData[parm] = compressedImage;
              if (fgroup != null)
              this[fgroup].controls[parm].setValue('image');
              //console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
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