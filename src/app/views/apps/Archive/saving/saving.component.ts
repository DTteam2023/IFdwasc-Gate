import { Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import '../../../../../assets/scanner.js';
import { NgxImageCompressService } from "ngx-image-compress";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { AppsService } from '../../apps.service';
import { AppService } from 'app/app.services';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class SavingComponent implements OnInit {
  @HostListener('window:storage')

  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  forthFormGroup: UntypedFormGroup;
  fifthFormGroup: UntypedFormGroup;
  userData = {
    AccountId: 0,
    AccountName: '',
    FileOfCalcCheck: '',
    BillReceipt: '',
    WaterChargeValueReceipt: '',
    WaterGharamaReceipt: '',
    UserID: '1',
    CenterId: 0,
    CreatedDate: new Date(),
    IsWater: false,
  }
  selectedFiles?: FileList;
  currentFile: File;
  name: '';
  savingType;
  iswater = true;
  isExist = false;
  objData = {
    acc: 0,
    isWater: false,
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
    this.savingType = this.route.snapshot.url[0].path;

    if (this.savingType == 'water') this.iswater = true
    if (this.savingType == 'sewer') this.iswater = false

    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      FileOfCalcCheck: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      BillReceipt: ['', Validators.required],
    });
    if (this.iswater) {
      this.forthFormGroup = this.fb.group({
        WaterChargeValueReceipt: ['', Validators.required],
      });
      this.fifthFormGroup = this.fb.group({
        WaterGharamaReceipt: ['', Validators.required],
      });
    }
    window.localStorage.setItem('images', '');
    window.localStorage.setItem('btnID', '');
  }

  onKey(event: any) { // without type info
    this.isExist = false;
    this.name = ''
    this.Service.loadDataClient(this.Service.centerId).subscribe((data) => {
      const emp = data.filter(d => d.CUSTKEY == event.target.value);      
      if (emp.length > 0) {
        this.name = emp[0]['SURNAME'];
        this.userData.AccountName = this.name;
        this.checkFoundAcc(event.target.value);
      }
    });
  }
  checkFoundAcc(acc: any) {
    this.appService.GetSupplyData(acc, this.userData.IsWater).subscribe((data) => {
      if (data.length == 0) {
        this['firstFormGroup'].controls['AccountId'].setValue(acc);
        this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        this.isExist = false;
      }
      else
        this.isExist = true;
    });
  }
  submit() {
    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.FileOfCalcCheck = (document.getElementById('FileOfCalcCheckImg') as HTMLImageElement).src
    this.userData.BillReceipt = (document.getElementById('BillReceiptImg') as HTMLImageElement).src
    //console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(this.userData.WCheckValueReceipt));

    if (this.userData) {
      if (this.iswater) {
        this.userData.WaterChargeValueReceipt = (document.getElementById('WaterChargeValueReceiptImg') as HTMLImageElement).src
        this.userData.WaterGharamaReceipt = (document.getElementById('WaterGharamaReceiptImg') as HTMLImageElement).src

        this.loader.open('اضافة طلب توفير المياه');
        this.userData.IsWater = true
        this.appService.PostWSupplyData(this.userData)
          .subscribe(data => {
            this.loader.close();
            this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
            //this.router.navigate(['/app/archive']);
            window.location.reload()

          })
      }
      else if (!this.iswater) {

        this.loader.open('اضافة طلب توفير الصرف');
        this.userData.IsWater = false
        this.appService.PostSSupplyData(this.userData)
          .subscribe(data => {
            this.loader.close();
            this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
            //this.router.navigate(['/app/archive']);
            window.location.reload()

          })
      }
    }
  }

  compressFile(parm: any, btnId: any, fgroup?: any) {
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