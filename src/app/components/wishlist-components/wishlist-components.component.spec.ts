import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponentsComponent } from './wishlist-components.component';

describe('WishlistComponentsComponent', () => {
  let component: WishlistComponentsComponent;
  let fixture: ComponentFixture<WishlistComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
