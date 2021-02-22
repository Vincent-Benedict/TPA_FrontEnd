import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionDetailComponentsComponent } from './discussion-detail-components.component';

describe('DiscussionDetailComponentsComponent', () => {
  let component: DiscussionDetailComponentsComponent;
  let fixture: ComponentFixture<DiscussionDetailComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionDetailComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
