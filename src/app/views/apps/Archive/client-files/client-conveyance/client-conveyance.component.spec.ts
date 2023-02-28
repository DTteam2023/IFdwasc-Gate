import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConveyanceComponent } from './client-conveyance.component';

describe('ClientConveyanceComponent', () => {
  let component: ClientConveyanceComponent;
  let fixture: ComponentFixture<ClientConveyanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConveyanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientConveyanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
