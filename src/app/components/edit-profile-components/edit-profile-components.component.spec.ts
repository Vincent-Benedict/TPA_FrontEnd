import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponentsComponent } from './edit-profile-components.component';

describe('EditProfileComponentsComponent', () => {
  let component: EditProfileComponentsComponent;
  let fixture: ComponentFixture<EditProfileComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
