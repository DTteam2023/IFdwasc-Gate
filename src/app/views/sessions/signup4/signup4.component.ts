import { Validators, UntypedFormGroup, UntypedFormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UntypedFormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AppService } from 'app/app.services';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { MatSnackBar } from "@angular/material/snack-bar";
interface Center {
  centerId: number;
  centerName: string;
}
@Component({
  selector: 'app-signup4',
  templateUrl: './signup4.component.html',
  styleUrls: ['./signup4.component.scss'],
  animations: egretAnimations
})
export class Signup4Component implements OnInit {

  signupForm: UntypedFormGroup;
  centers: Center[]

  userData = {
    FullName:'',
    EmpCode:'',
    UserName: '',
    Password: '',
    NationalId: '',
    Roles: 'Employee',
    CenterId: 0,
    createdDate:new Date()
  }
  isExist=false;
  isRegisted= false;
  errorMsg='';
  isDuplicated=false;

  constructor(private fb: UntypedFormBuilder,
    private appService: AppService,
    private jwtAuth: JwtAuthService,
    private router: Router,
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    ) {}

  ngOnInit() {
    this.appService.GetCenters().subscribe((data) => {
     console.log(typeof(data) );
     this.centers=data
    });

    const password = new UntypedFormControl('',[ Validators.required,Validators.pattern(
      /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ),
    Validators.minLength(8)]);

    this.signupForm = this.fb.group(
      {
        centerID: ["",Validators.required],
        NationalId: ["",[Validators.required,Validators.minLength(14),Validators.maxLength(14),this.EmpIDValidation()]],
        username: ["",Validators.required],
        password: password,
        agreed: [false,Validators.required]
      }
    );
  }
  EmpIDValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return  this.isExist ? null : { NationalId: true };
    };
  }
  onKey(event: any) { // without type info
    this.isExist = false;
    this.isRegisted=false;
    this.signupForm.get('NationalId').updateValueAndValidity();
    this.appService.loaddata().subscribe((data) => {
      const emp = data.filter(d => d.EmpID == event.target.value);
      if (emp.length > 0) {
        //console.log(emp);
        
        this.isExist = true;
        this.signupForm.get('NationalId').updateValueAndValidity();
        this.userData.NationalId=this.signupForm.get('NationalId').value;
        this.userData.FullName=emp[0].EmpName;
        this.userData.EmpCode=emp[0].EmpCode;

        this.appService.CheckNationalId(event.target.value).subscribe((data) => {
          if (data) {
             this.isRegisted=true
          }
          
        });
      }
    });

  }
onKeyUser(event:any){
  this.isDuplicated=false;    
  this.appService.GetAllUsers().subscribe((data) => {
    console.log(data);
        
   const emp = data.filter(d => d.userName == event.target.value); 
   console.log(emp);
             
   if (emp.length > 0) {
      this.isDuplicated=true;    
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
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      //console.log(this.userData);
      this.userData.UserName=this.signupForm.get('username').value;
      this.userData.CenterId=Number(this.signupForm.get('centerID').value);
      this.userData.Password=this.signupForm.get('password').value;
      
      //////// check if username dublicated  ////////

      if(this.userData){
      this.appService.Auth(this.userData)
      .subscribe(data => {
        //console.log(this.signupForm.value);
        this.jwtAuth.signin(this.userData.UserName, this.userData.Password)
        .subscribe(response => {
          this.loader.close();
          this.snack.open('تم انشاء الحساب', 'OK' ,{ duration: 1000 })
          setTimeout(() => {
            this.router.navigateByUrl(this.jwtAuth.return);
          }, 1000)
          
        })
      })}
    }
    else {
      this.errorMsg = 'تأكد من ادخال جميع البيانات المطلوبة ';
    }
  }
}