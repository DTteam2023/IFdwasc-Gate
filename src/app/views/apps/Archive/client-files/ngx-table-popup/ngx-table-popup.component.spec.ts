import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTablePopupComponent } from './ngx-table-popup.component';

describe('NgxTablePopupComponent', () => {
  let component: NgxTablePopupComponent;
  let fixture: ComponentFixture<NgxTablePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTablePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
