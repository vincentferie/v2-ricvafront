import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsDiverseComponent } from './reglements-diverse.component';

describe('ReglementsDiverseComponent', () => {
  let component: ReglementsDiverseComponent;
  let fixture: ComponentFixture<ReglementsDiverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReglementsDiverseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsDiverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
