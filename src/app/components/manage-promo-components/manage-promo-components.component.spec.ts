import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePromoComponentsComponent } from './manage-promo-components.component';

describe('ManagePromoComponentsComponent', () => {
  let component: ManagePromoComponentsComponent;
  let fixture: ComponentFixture<ManagePromoComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePromoComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePromoComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
