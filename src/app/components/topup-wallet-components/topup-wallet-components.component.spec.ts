import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupWalletComponentsComponent } from './topup-wallet-components.component';

describe('TopupWalletComponentsComponent', () => {
  let component: TopupWalletComponentsComponent;
  let fixture: ComponentFixture<TopupWalletComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopupWalletComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupWalletComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
