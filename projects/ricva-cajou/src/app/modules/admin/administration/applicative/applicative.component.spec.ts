import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicativeComponent } from './applicative.component';

describe('ApplicativeComponent', () => {
  let component: ApplicativeComponent;
  let fixture: ComponentFixture<ApplicativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicativeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
