import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePromoPageComponent } from './manage-promo-page.component';

describe('ManagePromoPageComponent', () => {
  let component: ManagePromoPageComponent;
  let fixture: ComponentFixture<ManagePromoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePromoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePromoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
