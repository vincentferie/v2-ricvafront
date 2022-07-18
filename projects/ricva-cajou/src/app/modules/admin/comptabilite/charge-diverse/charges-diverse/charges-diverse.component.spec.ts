import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesDiverseComponent } from './charges-diverse.component';

describe('ChargesDiverseComponent', () => {
  let component: ChargesDiverseComponent;
  let fixture: ComponentFixture<ChargesDiverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargesDiverseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesDiverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
