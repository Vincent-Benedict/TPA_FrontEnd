import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDetailComponentsComponent } from './review-detail-components.component';

describe('ReviewDetailComponentsComponent', () => {
  let component: ReviewDetailComponentsComponent;
  let fixture: ComponentFixture<ReviewDetailComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDetailComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
