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
  selector: 'app-conveyance',
  templateUrl: './conveyance.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class ConveyanceComponent implements OnInit {
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  forthFormGroup: UntypedFormGroup;
  fifthFormGroup: UntypedFormGroup;
  sixthFormGroup: UntypedFormGroup;
  userData = {
    AccountId: 0,
    AccountName: '',
    UserID: '1',
    CenterId: 0,
    CreatedDate: new Date(),
    ApartmentSaleContract: '',
    OldNationalId: '',
    NewNationalId: '',
    SignatureAuthenticity: '',
    TransferValueReciept: '',
    Avwal: '',
    TDelegation: ''
  }
  name: '';
  isNormal = true;
  openType = '';
  isExist = false;
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

    });
    this.secondFormGroup = this.fb.group({
      ApartmentSaleContract: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      OldNationalId: ['', Validators.required],
    });
    this.forthFormGroup = this.fb.group({
      NewNationalId: ['', Validators.required],
    });
    this.fifthFormGroup = this.fb.group({
      SignatureAuthenticity: ['', Validators.required],
    });
    this.sixthFormGroup = this.fb.group({
      TransferValueReciept: ['', Validators.required],
    });

    window.localStorage.setItem('images', '');
    window.localStorage.setItem('btnID', '');
    this.userData.Avwal = '';
    this.userData.TDelegation = '';

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
    this.appService.GetTransOwnerData(acc).subscribe((data) => {
      if (data.length == 0) {
        this['firstFormGroup'].controls['AccountId'].setValue(acc);
        this['firstFormGroup'].controls['AccountName'].setValue(acc);
      }
      else
        this.isExist = true;
    });
  }
  submit() {

    this.userData.AccountId = this.firstFormGroup.get('AccountId').value;
    this.userData.ApartmentSaleContract = (document.getElementById('ApartmentSaleContractImg') as HTMLImageElement).src
    this.userData.OldNationalId = (document.getElementById('OldNationalIdImg') as HTMLImageElement).src
    this.userData.NewNationalId = (document.getElementById('NewNationalIdImg') as HTMLImageElement).src
    this.userData.SignatureAuthenticity = (document.getElementById('SignatureAuthenticityImg') as HTMLImageElement).src
    this.userData.TransferValueReciept = (document.getElementById('TransferValueRecieptImg') as HTMLImageElement).src

    if (this.userData.Avwal != '')
      this.userData.Avwal = (document.getElementById('AvwalImg') as HTMLImageElement).src
    else
      this.userData.Avwal = ''

    if (this.userData.TDelegation != '')
      this.userData.TDelegation = (document.getElementById('TDelegationImg') as HTMLImageElement).src
    else
      this.userData.TDelegation = ''

    if (this.userData) {

      this.loader.open('اضافة طلب نقل ملكية');
      this.appService.PostTransOwnerData(this.userData)
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 2000 })
          //this.router.navigate(['/app/archive']);
          window.location.reload()

        })

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
                this[fgroup].controls[parm].setValue(compressedImage);
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