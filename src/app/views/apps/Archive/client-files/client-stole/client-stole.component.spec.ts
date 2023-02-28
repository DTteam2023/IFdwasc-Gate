import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStoleComponent } from './client-stole.component';

describe('ClientStoleComponent', () => {
  let component: ClientStoleComponent;
  let fixture: ComponentFixture<ClientStoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientStoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
