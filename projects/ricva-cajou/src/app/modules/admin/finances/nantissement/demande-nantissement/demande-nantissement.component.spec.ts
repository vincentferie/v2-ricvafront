import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeNantissementComponent } from './demande-nantissement.component';

describe('DemandeNantissementComponent', () => {
  let component: DemandeNantissementComponent;
  let fixture: ComponentFixture<DemandeNantissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeNantissementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeNantissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
