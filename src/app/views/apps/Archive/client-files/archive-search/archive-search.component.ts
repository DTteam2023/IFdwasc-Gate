import { Component, OnInit } from '@angular/core';
import { AppsService } from 'app/views/apps/apps.service';

@Component({
  selector: 'app-archive-search',
  templateUrl: './archive-search.component.html',
  styleUrls: ['./archive-search.component.scss']
})
export class ArchiveSearchComponent implements OnInit {
  SearchTerm: any;
  openSearch = false
  wpreviewSearch = false
  spreviewSearch = false
  wsaveSearch = false
  ssaveSearch = false
  conveyanceSearch = false
  checkMeterSearch = false
  certificationSearch = false
  accStateSearch = false
  cutOffSearch = false
  stoleSearch = false
  checkdiffSearch = false

  opensearchData;
  wsaveData;
  ssaveData;
  wpreviewData;
  spreviewData;
  conveyanceData;
  checkMeterData;
  certificationData;
  accStateData;
  cutOffData;
  stoleData;
  checkdiffData;

  acc = 'normal';
  constructor(
    private appService: AppsService,
  ) { }
  ngOnInit(): void {
    this.updateSearchTerm("");
  }
  updateSearchTerm(term: string) {
    //console.log(term);
    this.wpreviewSearch = this.spreviewSearch = this.openSearch = this.wsaveSearch = false;
    this.ssaveSearch = this.conveyanceSearch = this.checkMeterSearch = this.certificationSearch = false;
    this.accStateSearch = this.cutOffSearch = this.stoleSearch = this.checkdiffSearch = false;
    if (term != '') {
      this.appService.GetOpBalByAccount(term).subscribe((data: any) => {
        if (data.length > 0) {
          this.openSearch = true;
          this.opensearchData = data[0];
          if (!data[0]['isNormalAccount']) {
            this.acc = 'random';
          }
        }
      })

      this.appService.GetReceiptCheckData(term, true).subscribe((data: any) => {
        if (data.length > 0) this.wpreviewSearch = true; this.wpreviewData = data
      })

      this.appService.GetReceiptCheckData(term, false).subscribe((data: any) => {
        if (data.length > 0) this.spreviewSearch = true; this.spreviewData = data
      })

      this.appService.GetSupplyData(term, true).subscribe((data: any) => {
        if (data.length > 0) this.wsaveSearch = true; this.wsaveData = data[0]
      })

      this.appService.GetSupplyData(term, false).subscribe((data: any) => {
        if (data.length > 0) this.ssaveSearch = true; this.ssaveData = data[0]
      })

      this.appService.GetTransOwnerData(term).subscribe((data: any) => {        
        
        if (data.length > 0)
          this.conveyanceSearch = true;
        this.conveyanceData = data[0]
      })
      this.appService.GetCheckMeterDataObjects(term).subscribe((data: any) => {
        if (data.length > 0) {
          this.checkMeterSearch = true; this.checkMeterData = data;
        }
      })
      this.appService.GetCutData(term).subscribe((data: any) => { 
        if (data.length > 0) {
          this.cutOffSearch = true; this.cutOffData = data[0];
        }
      })
      this.appService.GetCertiDataObjects(term).subscribe((data: any) => {
        if (data.length > 0) {
          this.certificationSearch = true; this.certificationData = data;
        }
      })
      this.appService.GetAccStatDataObjects(term).subscribe((data: any) => {
        if (data.length > 0) {
          this.accStateSearch = true; this.accStateData = data;
        }
      })
      this.appService.GetStolenMDataObjects(term).subscribe((data: any) => {
        if (data.length > 0) {          
          this.stoleSearch = true; this.stoleData = data;
        }
      })
      this.appService.GetCheckDDataObjects(term).subscribe((data: any) => {
        if (data.length > 0) {
          this.checkdiffSearch = true; this.checkdiffData = data;
        }
      })
    }


    this.SearchTerm = term;
  }
}