import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailComponentsComponent } from './item-detail-components.component';

describe('ItemDetailComponentsComponent', () => {
  let component: ItemDetailComponentsComponent;
  let fixture: ComponentFixture<ItemDetailComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
