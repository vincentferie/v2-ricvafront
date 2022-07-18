import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatsChargesComponent } from './etats-charges.component';

describe('EtatsChargesComponent', () => {
  let component: EtatsChargesComponent;
  let fixture: ComponentFixture<EtatsChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatsChargesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatsChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
