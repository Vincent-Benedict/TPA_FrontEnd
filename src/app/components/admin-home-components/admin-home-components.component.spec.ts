import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponentsComponent } from './admin-home-components.component';

describe('AdminHomeComponentsComponent', () => {
  let component: AdminHomeComponentsComponent;
  let fixture: ComponentFixture<AdminHomeComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
