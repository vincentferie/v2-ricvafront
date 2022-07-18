import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicvaButtonsComponent } from './ricva-buttons.component';

describe('RicvaButtonsComponent', () => {
  let component: RicvaButtonsComponent;
  let fixture: ComponentFixture<RicvaButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RicvaButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RicvaButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
