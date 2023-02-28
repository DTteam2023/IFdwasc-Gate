import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOpenComponent } from './client-open.component';

describe('ClientOpenComponent', () => {
  let component: ClientOpenComponent;
  let fixture: ComponentFixture<ClientOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
