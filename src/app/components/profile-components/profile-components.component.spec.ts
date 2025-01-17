import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponentsComponent } from './profile-components.component';

describe('ProfileComponentsComponent', () => {
  let component: ProfileComponentsComponent;
  let fixture: ComponentFixture<ProfileComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
