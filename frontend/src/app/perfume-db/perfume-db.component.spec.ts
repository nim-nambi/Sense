import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeDbComponent } from './perfume-db.component';

describe('PerfumeDbComponent', () => {
  let component: PerfumeDbComponent;
  let fixture: ComponentFixture<PerfumeDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfumeDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfumeDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
