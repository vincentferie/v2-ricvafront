import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsChargeOperationnelleComponent } from './reglements-charge-operationnelle.component';

describe('ReglementsChargeOperationnelleComponent', () => {
  let component: ReglementsChargeOperationnelleComponent;
  let fixture: ComponentFixture<ReglementsChargeOperationnelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReglementsChargeOperationnelleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsChargeOperationnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
