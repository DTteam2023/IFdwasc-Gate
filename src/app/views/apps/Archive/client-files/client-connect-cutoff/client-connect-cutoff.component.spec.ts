import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConnectCutoffComponent } from './client-connect-cutoff.component';

describe('ClientConnectCutoffComponent', () => {
  let component: ClientConnectCutoffComponent;
  let fixture: ComponentFixture<ClientConnectCutoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConnectCutoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientConnectCutoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
