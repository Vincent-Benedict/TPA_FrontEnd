import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGameComponentsComponent } from './manage-game-components.component';

describe('ManageGameComponentsComponent', () => {
  let component: ManageGameComponentsComponent;
  let fixture: ComponentFixture<ManageGameComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGameComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGameComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
