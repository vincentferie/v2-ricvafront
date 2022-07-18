import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousContratComponent } from './sous-contrat.component';

describe('SousContratComponent', () => {
  let component: SousContratComponent;
  let fixture: ComponentFixture<SousContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SousContratComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
