
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtAuthService } from './shared/services/auth/jwt-auth.service';
import { User } from './shared/models/user.model';
import { environment } from 'environments/environment';

declare let scanner: any;

@Injectable({
  providedIn: 'root' // just before your class
})
export class AppService {
  public user: User;
  public centerId;
  public EmpCode;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private httpclient: HttpClient, private jwtAuth: JwtAuthService) {
    this.user = this.jwtAuth.getUser();

    this.GetAllUsers().subscribe((data) => {
      if (this.user) {
        const emp = data.filter(d => d.id == this.user.id);
        if (emp.length > 0) {
          this.centerId = emp[0]['centerId'];
          this.EmpCode = emp[0]['empCode'];

        }
      }
    });
  }
  //private baseApiUrl = "https://localhost:44367/";
  loaddata(): Observable<any> {
    return this.httpclient.get<any>('/assets/ServicesList/EmpData.json');
  }
  loadDataClient(centerId:any): Observable<any> {
    if(centerId==1)
      return this.httpclient.get<any>('/assets/ServicesList/fayoumClients.json');
    else if(centerId==2)
      return this.httpclient.get<any>('/assets/ServicesList/tamiaClients.json');
    else if(centerId==3)
      return this.httpclient.get<any>('/assets/ServicesList/snorsClients.json');
    else if(centerId==4)
      return this.httpclient.get<any>('/assets/ServicesList/abshwayClients.json');
    else if(centerId==5)
      return this.httpclient.get<any>('/assets/ServicesList/etsaClients.json');
  }

  Auth(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/auth/Auth`, user)
  }
  GetCenters(): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Fdwasc/GetCenters`).pipe(map((data: any) => { return data }))
  }
  GetallRoles(): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Fdwasc/GetallRoles`).pipe(map((data: any) => { return data }))
  }
  GetAllUsers(): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Fdwasc/GetAllUsers`).pipe(map((data: any) => { return data }))
  }
  CheckNationalId(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Fdwasc/CheckNationalId/` + acc).pipe()
  }
  patchUsers(user: any, obj: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Fdwasc/patchUsers/` + user, obj, this.httpOptions)
  }
}