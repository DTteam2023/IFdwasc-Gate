import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OhdaComponent } from './ohda.component';

describe('OhdaComponent', () => {
  let component: OhdaComponent;
  let fixture: ComponentFixture<OhdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OhdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OhdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
