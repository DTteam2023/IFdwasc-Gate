import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCertificationComponent } from './client-certification.component';

describe('ClientCertificationComponent', () => {
  let component: ClientCertificationComponent;
  let fixture: ComponentFixture<ClientCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
