import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesOperationnelleComponent } from './charges-operationnelle.component';

describe('ChargesOperationnelleComponent', () => {
  let component: ChargesOperationnelleComponent;
  let fixture: ComponentFixture<ChargesOperationnelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargesOperationnelleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesOperationnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
