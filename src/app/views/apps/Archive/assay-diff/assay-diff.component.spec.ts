import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayDiffComponent } from './assay-diff.component';

describe('AssayDiffComponent', () => {
  let component: AssayDiffComponent;
  let fixture: ComponentFixture<AssayDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssayDiffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssayDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
