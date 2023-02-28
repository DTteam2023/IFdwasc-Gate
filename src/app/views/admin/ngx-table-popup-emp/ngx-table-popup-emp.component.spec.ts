import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTablePopupEmpComponent } from './ngx-table-popup-emp.component';

describe('NgxTablePopupEmpComponent', () => {
  let component: NgxTablePopupEmpComponent;
  let fixture: ComponentFixture<NgxTablePopupEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTablePopupEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTablePopupEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
