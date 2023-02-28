import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCertificateComponent } from './data-certificate.component';

describe('DataCertificateComponent', () => {
  let component: DataCertificateComponent;
  let fixture: ComponentFixture<DataCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
