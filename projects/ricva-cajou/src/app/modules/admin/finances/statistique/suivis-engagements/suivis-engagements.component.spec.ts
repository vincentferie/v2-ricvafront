import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivisEngagementsComponent } from './suivis-engagements.component';

describe('SuivisEngagementsComponent', () => {
  let component: SuivisEngagementsComponent;
  let fixture: ComponentFixture<SuivisEngagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuivisEngagementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivisEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
