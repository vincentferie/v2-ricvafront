import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfLandingsComponent } from './bill-of-landings.component';

describe('BillOfLandingsComponent', () => {
  let component: BillOfLandingsComponent;
  let fixture: ComponentFixture<BillOfLandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillOfLandingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillOfLandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
