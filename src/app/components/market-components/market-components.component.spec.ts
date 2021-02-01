import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketComponentsComponent } from './market-components.component';

describe('MarketComponentsComponent', () => {
  let component: MarketComponentsComponent;
  let fixture: ComponentFixture<MarketComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
