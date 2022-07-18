import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettreTiersDetentionComponent } from './lettre-tiers-detention.component';

describe('LettreTiersDetentionComponent', () => {
  let component: LettreTiersDetentionComponent;
  let fixture: ComponentFixture<LettreTiersDetentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LettreTiersDetentionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LettreTiersDetentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
