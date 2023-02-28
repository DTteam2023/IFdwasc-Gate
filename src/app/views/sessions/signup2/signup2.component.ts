import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, UntypedFormGroup, NgForm, FormGroupDirective, UntypedFormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from 'app/app.services';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Router } from '@angular/router';
interface Center {
  CenterId: string;
  CenterName: string;
}
@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.scss"]
})
export class Signup2Component implements OnInit {
  signupForm: UntypedFormGroup;
  centers: Center[]=[
    {CenterId: '1', CenterName: 'مدينة الفيوم'},
    {CenterId: '2', CenterName: 'مركز الفيوم'},
    {CenterId: '3', CenterName: 'ابشواي'},
    {CenterId: '4', CenterName: 'سنورس'},
  ];
  userData = {
    FirstName:'esraa',
    LastName:'adel',
    UserName: '',
    Password: '',
    NationalId: '',
    Roles: 'ADMIN',
    CenterId: ''
  }
  isExist=false;
  constructor(private fb: UntypedFormBuilder,
    private appService: AppService,
    private jwtAuth: JwtAuthService,
    private router: Router,

    ) {}

  ngOnInit() {

    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = this.fb.group(
      {
        centerID: ["",Validators.required],
        EmpID: ["",[Validators.required,this.EmpIDValidation()]],
        username: ["",Validators.required],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }
  EmpIDValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return  this.isExist ? null : { EmpID: true };
    };
  }
  onKey(event: any) { // without type info
    this.isExist = false;
    this.signupForm.get('EmpID').updateValueAndValidity();
    this.appService.loaddata().subscribe((data) => {
      const emp = data.filter(d => d.EmpID == event.target.value);
      if (emp.length > 0) {
        this.isExist = true;
        this.signupForm.get('EmpID').updateValueAndValidity();
        this.userData.NationalId=this.signupForm.get('EmpID').value;
      }
    });

  }

//  checkValid(control: AbstractControl) {
//    return new Promise((resolve, reject) => {
//      setTimeout(() => {
//        if (control.value === 'super@secret.com') {
//            resolve({ emailIsTaken: true })
//        } else {resolve(null)}
//      }, 2000)
//    })
//}

  onSubmit() {
    //if (!this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.userData);
      this.userData.UserName=this.signupForm.get('username').value;
      this.userData.CenterId=this.signupForm.get('centerID').value;
      this.userData.Password=this.signupForm.get('password').value;

      if(this.userData){
      this.appService.Auth(this.userData)
      .subscribe(data => {
        console.log(this.signupForm.value);
        this.jwtAuth.signin(this.userData.UserName, this.userData.Password)
        .subscribe(response => {
          this.router.navigateByUrl(this.jwtAuth.return);
        })
      })}
   // }
  }
}