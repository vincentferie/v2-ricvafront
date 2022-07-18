import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureAvanceContratComponent } from './facture-avance-contrat.component';

describe('FactureAvanceContratComponent', () => {
  let component: FactureAvanceContratComponent;
  let fixture: ComponentFixture<FactureAvanceContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactureAvanceContratComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureAvanceContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
