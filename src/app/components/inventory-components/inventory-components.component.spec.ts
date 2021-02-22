import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponentsComponent } from './inventory-components.component';

describe('InventoryComponentsComponent', () => {
  let component: InventoryComponentsComponent;
  let fixture: ComponentFixture<InventoryComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
