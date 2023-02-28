
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import '../../../assets/scanner.js';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { environment } from 'environments/environment';

declare let scanner: any;

@Injectable({
  providedIn: 'root' // just before your class
})
export class AppsService {

 // private baseApiUrl = "https://localhost:44367/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(private httpclient: HttpClient,private jwtAuth: JwtAuthService) {

   }

  ////////////////// load client data ///////////////// 

  loaddata(): Observable<any> {
    return this.httpclient.get<any>('/assets/ServicesList/ohda.json');
  }

  ///////////////////////////////////////////////////////
  ///////////////////// فتح حساب ////////////////////////
  PostNOpBal(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostNOpBal`, user)
  }
  PostSOpBal(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostSOpBal`, user)
  }
  GetOpBalByAccount(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetOpBalByAccount/` + acc).pipe(map((data: any) => { return data }))
  }
  GetOpBal(acc: any, isNormal: boolean): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetOpBal/` + acc + '/' + isNormal).pipe(map((data: any) => { return data }))
  }
  patchOpBal(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchOpBal/` + data.acc + '/' + data.isNormal, user, this.httpOptions)
  }
  /////////////////////////////////////////////////////

  //////////////////// معاينة ////////////////////////
  PostCheckData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostCheckData`, user)
  }

  GetReceiptCheckData(acc: any, isWater: boolean): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetReceiptCheckDataAsArrayOfObjects/` + acc + '/' + isWater).pipe()
  }

  GetAllPicCheckData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCheckData/` + data.acc + '/' + data.isWater + '/' + data.receipt).pipe(
      map(obj => {
        return obj[0][data.col];
      }))
  }
  GetCheckData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCheckData/` + data).pipe(map((data: any) => { return data }))
  }
  CheckData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCheckData/` + data.acc + '/' + data.isWater + '/' + data.receipt).pipe(
    )
  }
  patchCheckData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchCheckData/` + data.acc + '/' + data.isWater + '/' + data.receipt, user, this.httpOptions)
  }
  //////////////////////////////////////////////////////
  ///////////////////// توفير ////////////////////////
  PostWSupplyData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostWSupplyData`, user)
  }
  PostSSupplyData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostSSupplyData`, user)
  }
  GetSupplyData(acc: any, isWater: boolean): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetSupplyData/` + acc + '/' + isWater).pipe(map((data: any) => { return data }))
  }
  patchSupplyData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchSupplyData/` + data.acc + '/' + data.isWater, user, this.httpOptions)
  }

  /////////////////////////////////////////////////////
  ///////////////////// نقل ملكية ////////////////////////
  PostTransOwnerData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostTransOwnerData`, user)
  }
  GetTransOwnerData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetTransOwnerData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchTransOwnerData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchTransOwnerData/` + data.acc, user, this.httpOptions)
  }
  /////////////////////////////////////////////////////
  ///////////////////// فحص العداد ////////////////////////
  PostCheckMeterData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostCheckMeterData`, user)
  }
  GetCheckMeterDataObjects(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCheckMeterDataObjects/` + acc).pipe()
  }
  GetChecMeterkData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetChecMeterkData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchCheckMeterData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchCheckMeterData/` + data.acc + '/' + data.receipt, user, this.httpOptions)
  }
  GetAllPicCheckMeterData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCheckMeterData/` + data.acc + '/' + data.receipt).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  GetChecMeter(receipt: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetChecMeter/` + receipt).pipe(map((data: any) => { return data }))
  }
  /////////////////////////////////////////////////////
  ///////////////////// قطع توصيلة نهائي ////////////////////////
  PostCutOffData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostCutOffData`, user)
  }
  GetCutData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCutData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchCutOffData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchCutOffData/` + data.acc , user, this.httpOptions)
  }
  GetAllPicCutOffData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCutOffData/` + data.acc ).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  /////////////////////////////////////////////////////
  ///////////////////// شهادة بيانات العميل ////////////////////////
  PostCerticData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostCerticData`, user)
  }
  GetCertiDataObjects(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCertiDataObjects/` + acc).pipe()
  }
  GetCertiData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCertiData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchCertiData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchCertiData/` + data.acc + '/' + data.receipt, user, this.httpOptions)
  }
  GetAllPicCertiData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCertiData/` + data.acc + '/' + data.receipt).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  GetCertificate(receipt: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCertificate/` + receipt).pipe(map((data: any) => { console.log(data);
     return data }))
  }
  /////////////////////////////////////////////////////
  ///////////////////// كشف حساب للعميل ////////////////////////
  PostAccStatData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostAccStatData`, user)
  }
  GetAccStatDataObjects(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAccStatDataObjects/` + acc).pipe()
  }
  GetAccStatData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAccStatData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchAccStatData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchAccStatData/` + data.acc + '/' + data.receipt, user, this.httpOptions)
  }
  GetAllPicAccStatData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicAccStatData/` + data.acc + '/' + data.receipt).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  GetAccStat(receipt: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAccStat/` + receipt).pipe(map((data: any) => { return data }))
  }
  /////////////////////////////////////////////////////
  ///////////////////// ملف عداد مسروق ////////////////////////
  PostStolenMData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostStolenMData`, user)
  }
  GetStolenMDataObjects(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetStolenMDataObjects/` + acc).pipe()
  }
  GetStolenMData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetStolenMData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchStolenMData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchStolenMData/` + data.acc + '/' + data.receipt, user, this.httpOptions)
  }
  GetAllPicStolenMData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicStolenMData/` + data.acc + '/' + data.receipt).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  GetStolenM(receipt: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetStolenM/` + receipt).pipe(map((data: any) => { return data }))
  }
  /////////////////////////////////////////////////////
  ///////////////////// فرق المقايسة ////////////////////////
  PostCheckDData(user: any): Observable<any> {
    return this.httpclient.post<any>(`${environment.apiURL}/api/Arch/PostCheckDData`, user)
  }
  GetCheckDDataObjects(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetCheckDDataObjects/`+ acc).pipe()
  }
  GetChickDiffData(acc: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetChickDiffData/` + acc).pipe(map((data: any) => { return data }))
  }
  patchCheckDData(data: any, user: any): Observable<any> {
    return this.httpclient.patch<any>(`${environment.apiURL}/api/Arch/patchCheckDData/` + data.acc + '/' + data.receipt, user, this.httpOptions)
  }
  GetAllPicCheckDData(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetAllPicCheckDData/` + data.acc + '/' + data.receipt).pipe(
      map(obj => {
        return obj[data.col];
      }))
  }
  GetChickDiff(data: any): Observable<any> {
    return this.httpclient.get<any>(`${environment.apiURL}/api/Arch/GetChickDiff/` + data).pipe(map((data: any) => { return data }))
  }
  /////////////////////////////////////////////////////


  ScanToJpg() {
    const that = this;
    scanner.scan(this.display,
      {
        "use_asprise_dialog": false,
        "output_settings": [
          {
            "type": "return-base64",
            "format": "jpg"
          }
        ]
      })
  }

display(successful: any, mesg: any, response: any) {
    const scannedImages = scanner.getScannedImages(response, true, false);
    for (let i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
      var scannedImage = scannedImages[i];
    }
    var orientation = -1;
    ({ image, orientation }) => {        
      scannedImage
        .compressFile(image, orientation, 50, 50) // 50% ratio, 50% quality
        .then(
          (compressedImage) => {
            scannedImage = scannedImage.byteCount(compressedImage) / (1024 * 1024)
           
          }
        );
    }
   
    (document.getElementById(window.localStorage.getItem('images')) as HTMLImageElement).src = scannedImage.src;
    (document.getElementById(window.localStorage.getItem('btnID')) as HTMLButtonElement | null).disabled = false;
  }
}
