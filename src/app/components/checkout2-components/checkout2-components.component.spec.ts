import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkout2ComponentsComponent } from './checkout2-components.component';

describe('Checkout2ComponentsComponent', () => {
  let component: Checkout2ComponentsComponent;
  let fixture: ComponentFixture<Checkout2ComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Checkout2ComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Checkout2ComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
