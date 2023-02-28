import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Validators, UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { JwtAuthService } from '../../../shared/services/auth/jwt-auth.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
  selector: 'app-signin4',
  templateUrl: './signin4.component.html',
  styleUrls: ['./signin4.component.scss'],
  animations: egretAnimations
})
export class Signin4Component implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  private _unsubscribeAll: Subject<any>;

  constructor(private fb: UntypedFormBuilder,
    private jwtAuth: JwtAuthService,
    private egretLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute) {
      this._unsubscribeAll = new Subject();
    }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
    }

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

   this.signinForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
  }
  ngAfterViewInit() {
    this.autoSignIn();
  }
  signin() {
    if (this.signinForm.valid) {

    const signinData = this.signinForm.value

    this.submitButton.disabled = true;
    //this.progressBar.mode = 'indeterminate';
    
    this.jwtAuth.signin(signinData.username, signinData.password)
    .subscribe(response => {
      this.router.navigateByUrl(this.jwtAuth.return);
    }, err => {
      this.submitButton.disabled = false;
      //this.progressBar.mode = 'determinate';
      //this.errorMsg = err.message;
      this.errorMsg = 'اسم المتخدم أو كلمة السر غير صحيح';

      // console.log(err);
    })}
    else {
      this.errorMsg = 'تأكد من ادخال اسم المتخدم أو كلمة السر ';
    }
  }

  autoSignIn() {    
    if(this.jwtAuth.return === '/') {
      return
    }
    this.egretLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, {width: '320px'});
    setTimeout(() => {
      this.signin();
      console.log('autoSignIn');
      this.egretLoader.close()
    }, 2000);
  }
}
