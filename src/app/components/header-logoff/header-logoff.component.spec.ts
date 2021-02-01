import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLogoffComponent } from './header-logoff.component';

describe('HeaderLogoffComponent', () => {
  let component: HeaderLogoffComponent;
  let fixture: ComponentFixture<HeaderLogoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLogoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLogoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
