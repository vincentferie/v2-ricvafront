import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementFactureAvanceContratComponent } from './reglement-facture-avance-contrat.component';

describe('ReglementFactureAvanceContratComponent', () => {
  let component: ReglementFactureAvanceContratComponent;
  let fixture: ComponentFixture<ReglementFactureAvanceContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReglementFactureAvanceContratComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementFactureAvanceContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
