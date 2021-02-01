import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponentsComponent } from './cart-components.component';

describe('CartComponentsComponent', () => {
  let component: CartComponentsComponent;
  let fixture: ComponentFixture<CartComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
