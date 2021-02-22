import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponentsComponent } from './badge-components.component';

describe('BadgeComponentsComponent', () => {
  let component: BadgeComponentsComponent;
  let fixture: ComponentFixture<BadgeComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
