import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserComponentsComponent } from './manage-user-components.component';

describe('ManageUserComponentsComponent', () => {
  let component: ManageUserComponentsComponent;
  let fixture: ComponentFixture<ManageUserComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
