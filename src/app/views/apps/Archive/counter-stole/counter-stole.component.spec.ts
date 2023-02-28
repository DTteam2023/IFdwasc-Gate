import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStoleComponent } from './counter-stole.component';

describe('CounterStoleComponent', () => {
  let component: CounterStoleComponent;
  let fixture: ComponentFixture<CounterStoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterStoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
