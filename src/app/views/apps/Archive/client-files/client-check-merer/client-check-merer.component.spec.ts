import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCheckMererComponent } from './client-check-merer.component';

describe('ClientCheckMererComponent', () => {
  let component: ClientCheckMererComponent;
  let fixture: ComponentFixture<ClientCheckMererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCheckMererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCheckMererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
