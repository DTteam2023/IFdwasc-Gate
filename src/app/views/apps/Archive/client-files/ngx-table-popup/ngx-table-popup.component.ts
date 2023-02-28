import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AppsService } from 'app/views/apps/apps.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-ngx-table-popup',
  templateUrl: './ngx-table-popup.component.html',
  styleUrls: ['./ngx-table-popup.component.scss']
})
export class NgxTablePopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  imgSrc: any;
  showEditOption = false;
  object = {
    "op": "replace",
    "path": '',
    "value": ''
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageCompress: NgxImageCompressService,
    public dialogRef: MatDialogRef<NgxTablePopupComponent>,
    private appService: AppsService,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.imgSrc = this.data.payload;
  }

  choosefile() {
    this.imageCompress.uploadFile().then(
      ({ image, orientation }) => {
        //this.imgResultBeforeCompression = image;
        //console.log("Size in bytes of the uploaded image was:", this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
          .then(
            (compressedImage) => {
              this.imgSrc = compressedImage;
              //console.log("Size in bytes after compression is now:", this.imageCompress.byteCount(compressedImage));
              this.object.path = '/' + this.data.client.col;
              this.object.value = this.imgSrc
            }
          );
      }
    );
    this.showEditOption = !this.showEditOption;
  }
  submit() {
    this.loader.open('جاري التحديث');

    if (this.data.typeOrder == 'open') {
      this.appService.patchOpBal(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 });
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'preview') {
      this.appService.patchCheckData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'saving') {

      this.appService.patchSupplyData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'convyance') {
      this.appService.patchTransOwnerData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'checkMeter') {
      this.appService.patchCheckMeterData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'cutOff') {
      this.appService.patchCutOffData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'certification') {
      this.appService.patchCertiData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'state') {
      this.appService.patchAccStatData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'stole') {
      this.appService.patchStolenMData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.dialogRef.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          //this.router.navigate(['/app/archive']);
        })
    }
    else if (this.data.typeOrder == 'checkdiff') {
      this.appService.patchCheckDData(this.data.client, [this.object])
        .subscribe(data => {
          this.loader.close();
          this.snack.open('تم الحفظ', 'OK', { duration: 4000 })
          this.dialogRef.close();
          //this.router.navigate(['/app/archive']);
        })
    }
  }

  print() {
    //let printContents = (document.getElementById("component1") as HTMLImageElement).innerHTML;
    //let originalContents = document.body.innerHTML;
    //document.body.innerHTML = printContents;
    //window.print();
    //document.body.innerHTML = originalContents;


    var newWin = window.open('', 'thePopup');
    newWin.document.write("<html><body >" +
    "<img src="+this.imgSrc+" height='1185px' width='820px'></body></html>");
    newWin.document.close(); // necessary for IE >= 10
    newWin.focus(); // necessary for IE >= 10*/
    newWin.print();
    newWin.close();

  }
}

