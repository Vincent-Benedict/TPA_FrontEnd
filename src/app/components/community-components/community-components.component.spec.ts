import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityComponentsComponent } from './community-components.component';

describe('CommunityComponentsComponent', () => {
  let component: CommunityComponentsComponent;
  let fixture: ComponentFixture<CommunityComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
