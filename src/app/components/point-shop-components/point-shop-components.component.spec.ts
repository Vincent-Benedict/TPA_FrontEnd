import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointShopComponentsComponent } from './point-shop-components.component';

describe('PointShopComponentsComponent', () => {
  let component: PointShopComponentsComponent;
  let fixture: ComponentFixture<PointShopComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointShopComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointShopComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
