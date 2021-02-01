import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnapropriatePageComponent } from './innapropriate-page.component';

describe('InnapropriatePageComponent', () => {
  let component: InnapropriatePageComponent;
  let fixture: ComponentFixture<InnapropriatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnapropriatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnapropriatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
