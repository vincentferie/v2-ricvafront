import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefinancementFournisseurComponent } from './prefinancement-fournisseur.component';

describe('PrefinancementFournisseurComponent', () => {
  let component: PrefinancementFournisseurComponent;
  let fixture: ComponentFixture<PrefinancementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrefinancementFournisseurComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefinancementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
