
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface ohdaModel {
    l1description:string,
    qty: string,
    employeeid: string,
    l1name: string,
    L1Description: string,
    Unit: string
};

@Injectable({
  providedIn: 'root' // just before your class
})
export class ServicesListService {
  ohdaArr: ohdaModel[] ;  

  constructor(private http: HttpClient) { }
 
/////// ServicesList  //////////
  loadohad():Observable<ohdaModel[]> {
    return this.http.get<ohdaModel[]>('/assets/ServicesList/ohda.json');    
  }

}
