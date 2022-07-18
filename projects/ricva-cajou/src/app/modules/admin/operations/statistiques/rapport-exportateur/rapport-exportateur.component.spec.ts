import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportExportateurComponent } from './rapport-exportateur.component';

describe('RapportExportateurComponent', () => {
  let component: RapportExportateurComponent;
  let fixture: ComponentFixture<RapportExportateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapportExportateurComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportExportateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
