import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGamePageComponent } from './manage-game-page.component';

describe('ManageGamePageComponent', () => {
  let component: ManageGamePageComponent;
  let fixture: ComponentFixture<ManageGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
