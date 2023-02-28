import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCheckComponent } from './counter-check.component';

describe('CounterCheckComponent', () => {
  let component: CounterCheckComponent;
  let fixture: ComponentFixture<CounterCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
