import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSearchComponent } from './archive-search.component';

describe('ArchiveSearchComponent', () => {
  let component: ArchiveSearchComponent;
  let fixture: ComponentFixture<ArchiveSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
