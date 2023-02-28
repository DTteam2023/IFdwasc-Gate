import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectCutComponent } from './connect-cut.component';

describe('ConnectCutComponent', () => {
  let component: ConnectCutComponent;
  let fixture: ComponentFixture<ConnectCutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectCutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
