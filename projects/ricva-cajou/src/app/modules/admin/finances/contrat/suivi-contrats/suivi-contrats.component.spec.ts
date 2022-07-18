import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviContratsComponent } from './suivi-contrats.component';

describe('SuiviContratsComponent', () => {
  let component: SuiviContratsComponent;
  let fixture: ComponentFixture<SuiviContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuiviContratsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
