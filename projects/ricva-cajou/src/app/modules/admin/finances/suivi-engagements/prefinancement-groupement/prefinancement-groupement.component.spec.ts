import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefinancementGroupementComponent } from './prefinancement-groupement.component';

describe('PrefinancementGroupementComponent', () => {
  let component: PrefinancementGroupementComponent;
  let fixture: ComponentFixture<PrefinancementGroupementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrefinancementGroupementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefinancementGroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
