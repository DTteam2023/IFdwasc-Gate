import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccStateComponent } from './client-acc-state.component';

describe('ClientAccStateComponent', () => {
  let component: ClientAccStateComponent;
  let fixture: ComponentFixture<ClientAccStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAccStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
