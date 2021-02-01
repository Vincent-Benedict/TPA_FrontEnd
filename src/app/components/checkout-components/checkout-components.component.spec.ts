import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponentsComponent } from './checkout-components.component';

describe('CheckoutComponentsComponent', () => {
  let component: CheckoutComponentsComponent;
  let fixture: ComponentFixture<CheckoutComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
