import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponentsComponent } from './chat-components.component';

describe('ChatComponentsComponent', () => {
  let component: ChatComponentsComponent;
  let fixture: ComponentFixture<ChatComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
