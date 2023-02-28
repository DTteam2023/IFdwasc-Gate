import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccConvertComponent } from './acc-convert.component';

describe('AccConvertComponent', () => {
  let component: AccConvertComponent;
  let fixture: ComponentFixture<AccConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccConvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
