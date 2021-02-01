import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnapropriateComponentsComponent } from './innapropriate-components.component';

describe('InnapropriateComponentsComponent', () => {
  let component: InnapropriateComponentsComponent;
  let fixture: ComponentFixture<InnapropriateComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnapropriateComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnapropriateComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
