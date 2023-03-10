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
  selector: 'app-counter-stole',
  templateUrl: './counter-stole.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class CounterStoleComponent implements OnInit {
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  thirdFormGroup: UntypedFormGroup;
  forthFormGroup: UntypedFormGroup;
  fifthFormGroup: UntypedFormGroup;
  userData = {
    AccountId: 0,
    AccountName: '',
    ReportImg: '',
    NationalImg: '',
    DocumentImg: '',
    ReceiptImg: '',
    UserID: '',
    CenterId: 0,
    CreatedDate: new Date(),
    ReceiptNo: 0,
    
  }
  selectedFiles?: FileList;
  currentFile: File;
  name: '';
  isExist = false;
  objData = {
    acc: 0,
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
    this.firstFormGroup = this.fb.group({
      AccountId: ['', Validators.required],
      AccountName: ['', Validators.required],
      ReceiptNo: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      ReportImg: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      NationalImg: ['', Validators.required],
    });
    this.forthFormGroup = this.fb.group({
      DocumentImg: ['', Validators.required],
    });
    this.fifthFormGroup = this.fb.group({
      ReceiptImg: ['', Validators.required],
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
        receipt: event.target.value
      }

      this.appService.GetStolenM(event.target.value).subscribe((data) => {        
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
    this.userData.ReportImg = (document.getElementById('ReportImgImg') as HTMLImageElement).src
    this.userData.NationalImg = (document.getElementById('NationalImgImg') as HTMLImageElement).src
    this.userData.DocumentImg = (document.getElementById('DocumentImgImg') as HTMLImageElement).src
    this.userData.ReceiptImg = (document.getElementById('ReceiptImgImg') as HTMLImageElement).src

    if (this.userData) {
      this.loader.open('?????????? ?????? ???????? ??????????');
      this.appService.PostStolenMData(this.userData)
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
