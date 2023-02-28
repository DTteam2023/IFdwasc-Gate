import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper/index.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.services';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import '../../../../../assets/scanner.js';
import { AppsService } from '../../apps.service';
declare let scanner: any;

@Component({
  selector: 'app-acc-open',
  templateUrl: './acc-open.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class AccOpenComponent implements OnInit,AfterViewInit  {
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  forthFormGroup: UntypedFormGroup;
  fifthFormGroup: UntypedFormGroup;
  sixthFormGroup: UntypedFormGroup;
  seventhFormGroup: UntypedFormGroup;
  userData = {
    AccountId: '',
    AccountName: '',
    UserID: '',
    CenterId: 0,
    CreatedDate: new Date(),
    IsNormalAccount: true,
    OwnerLeaseContract: '',
    NationalImg: '',
    NeighborBill: '',
    ApartmentLicense: '',
    MahaliatApproval: '',
    CompanyCustomerContract: '',
    MoreOwnerAvowal: ''
  }
  name: '';
  isNormal = true;
  openType = ''
  isExist = false;
  private targetInput = 'title0';
  constructor(private fb: UntypedFormBuilder,
    private appService: AppsService,
    private Service: AppService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private imageCompress: NgxImageCompressService,
    private route: ActivatedRoute,
    private router: Router) {
      this.userData.UserID=this.Service.user.id;
      this.userData.CenterId = this.Service.centerId;    
  }

  ngOnInit() {
    this.openType = this.route.snapshot.url[0].path;

    if (this.openType == 'normal') {
      this.isNormal = true;
    }
    else if (this.openType == 'random') {
      this.isNormal = false;
    }

    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      OwnerLeaseContract: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      NationalImg: ['', Validators.required],
    });
    this.forthFormGroup = this.fb.group({
      NeighborBill: ['', Validators.required],
    });
    if (this.isNormal) {
      this.fifthFormGroup = this.fb.group({
        ApartmentLicense: ['', Validators.required],
      });
      this.sixthFormGroup = this.fb.group({
        MahaliatApproval: ['', Validators.required],
      });
    }
    this.seventhFormGroup = this.fb.group({
      CompanyCustomerContract: ['', Validators.required],
    });
    window.localStorage.setItem('images', '');
    window.localStorage.setItem('btnID', '');
    this.userData.MoreOwnerAvowal = '';
  }

  onKey(event: any) { // without type info

    this.isExist = false;
    this.name = '';
    
    this.Service.loadDataClient(this.Service.centerId).subscribe((data) => {
      const client = data.filter(d => d.CUSTKEY === event.target.value);   
      if (client.length > 0) {
        this.name = client[0]['SURNAME'];

        this.checkFoundAcc(event.target.value);
      }
    });
  }
  checkFoundAcc(acc: any) {
    var startTime = performance.now()

    this.appService.GetOpBalByAccount(acc).subscribe((data) => {
      
      //console.log(data);
      var endTime = performance.now()
      console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

      if (data.length==0) {        
        this['firstFormGroup'].controls['AccountId'].setValue(acc);
        this['firstFormGroup'].controls['AccountName'].setValue(this.name);
        this.isExist = false;
        this.userData.AccountName = this.name;

      }
      else
        this.isExist = true;
    });
  }
  submit() {

    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.OwnerLeaseContract = (document.getElementById('OwnerLeaseContractImg') as HTMLImageElement).src
    this.userData.NationalImg = (document.getElementById('NationalImgImg') as HTMLImageElement).src
    this.userData.NeighborBill = (document.getElementById('NeighborBillImg') as HTMLImageElement).src
    this.userData.CompanyCustomerContract = (document.getElementById('CompanyCustomerContractImg') as HTMLImageElement).src
    if (this.userData.MoreOwnerAvowal != '')
      this.userData.MoreOwnerAvowal = (document.getElementById('MoreOwnerAvowalImg') as HTMLImageElement).src
    else
      this.userData.MoreOwnerAvowal = ''

    if (this.userData) {

      if (this.isNormal) {
        this.userData.ApartmentLicense = (document.getElementById('ApartmentLicenseImg') as HTMLImageElement).src
        this.userData.MahaliatApproval = (document.getElementById('MahaliatApprovalImg') as HTMLImageElement).src
        this.loader.open('اضافة طلب فتح حساب رسمي');
        this.userData.IsNormalAccount = true
        this.appService.PostNOpBal(this.userData)
          .subscribe(data => {
            this.loader.close();
            this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
            //this.router.navigate(['/app/archive']);
            window.location.reload()

          })
      }
      else if (!this.isNormal) {
        this.loader.open('اضافة طلب فتح حساب عشوائي');
        this.userData.IsNormalAccount = false
        this.appService.PostSOpBal(this.userData)
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

    if (fgroup != '')
      this[fgroup].controls[parm].setValue(img);
  }

  public onStepChange(event: any): void {
    console.log(event.selectedIndex);
  }

  ngAfterViewInit() {
    this.setFocus();
  }

  private setFocus() {
    let targetElem = document.getElementById(this.targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }

  onChange(event: any) {
    let index = String(event.selectedIndex);
    this.targetInput = 'title' + index;
    this.setFocus();
  }
}