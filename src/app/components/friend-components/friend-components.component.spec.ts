import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendComponentsComponent } from './friend-components.component';

describe('FriendComponentsComponent', () => {
  let component: FriendComponentsComponent;
  let fixture: ComponentFixture<FriendComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
