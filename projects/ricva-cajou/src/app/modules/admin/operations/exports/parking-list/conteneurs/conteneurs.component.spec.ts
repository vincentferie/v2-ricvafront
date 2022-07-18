import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteneursComponent } from './conteneurs.component';

describe('ConteneursComponent', () => {
  let component: ConteneursComponent;
  let fixture: ComponentFixture<ConteneursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConteneursComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteneursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
