import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCheckdiffComponent } from './client-checkdiff.component';

describe('ClientCheckdiffComponent', () => {
  let component: ClientCheckdiffComponent;
  let fixture: ComponentFixture<ClientCheckdiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCheckdiffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCheckdiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
