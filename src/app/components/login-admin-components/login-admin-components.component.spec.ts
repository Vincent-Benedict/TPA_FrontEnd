import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminComponentsComponent } from './login-admin-components.component';

describe('LoginAdminComponentsComponent', () => {
  let component: LoginAdminComponentsComponent;
  let fixture: ComponentFixture<LoginAdminComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdminComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdminComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
