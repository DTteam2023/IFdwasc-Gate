import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-it',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class ITComponent implements OnInit {

  imgname;
  constructor(private router: ActivatedRoute) {
   }

  ngOnInit(): void {

    this.router.paramMap.subscribe(params => { 
       this.imgname = params.get('id'); 
   });
  }

}
