import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { ServicesListModule } from '../ServicesList.module';
import { ohdaModel, ServicesListService } from '../ServicesList.service';

@Component({
  selector: 'app-healthcare',
  templateUrl: './healthcare.component.html',
  styleUrls: ['./healthcare.component.scss'],
  animations: egretAnimations
})
export class HealthcareComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['employeeid', 'l1description', 'l1name', 'Unit'];
  dataSource : any;

  ohdaArr: ohdaModel[] ;  
  //@Input() EmpCode: string;
  EmpCode:string="1000009"

  
  constructor(private http:ServicesListService) { }

  ngOnInit() {

    this.http.loadohad().subscribe((products) => {
      this.dataSource=products.filter(d=>d.employeeid===this.EmpCode);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }

}
