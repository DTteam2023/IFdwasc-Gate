import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppService } from 'app/app.services';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ohdaModel, ServicesListService } from '../ServicesList.service';

@Component({
  selector: 'app-ohda',
  templateUrl: './ohda.component.html',
  styleUrls: ['./ohda.component.scss'],
  animations: egretAnimations
})
export class OhdaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['l1description', 'Unit'];
  dataSource: any = [];

  ohdaArr: ohdaModel[];
  //@Input() EmpCode: string;
  EmpCode: string = "1000009"


  constructor(private http: ServicesListService,
    private Service: AppService) {
  }

  ngOnInit() {
console.log(this.Service.EmpCode);

    this.http.loadohad().subscribe((products) => {
      this.dataSource = products.filter(d => d.employeeid === this.Service.EmpCode);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

}
