import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSavingComponent } from './client-saving.component';

describe('ClientSavingComponent', () => {
  let component: ClientSavingComponent;
  let fixture: ComponentFixture<ClientSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSavingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
