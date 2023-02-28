import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccOpenComponent } from './acc-open.component';

describe('AccOpenComponent', () => {
  let component: AccOpenComponent;
  let fixture: ComponentFixture<AccOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
