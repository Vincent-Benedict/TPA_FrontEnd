import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointShopPageComponent } from './point-shop-page.component';

describe('PointShopPageComponent', () => {
  let component: PointShopPageComponent;
  let fixture: ComponentFixture<PointShopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointShopPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
