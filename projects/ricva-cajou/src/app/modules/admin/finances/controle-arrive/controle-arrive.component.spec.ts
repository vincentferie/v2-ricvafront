import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleArriveComponent } from './controle-arrive.component';

describe('ControleArriveComponent', () => {
  let component: ControleArriveComponent;
  let fixture: ComponentFixture<ControleArriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControleArriveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleArriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
