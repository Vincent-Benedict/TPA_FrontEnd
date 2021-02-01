import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupWalletPageComponent } from './topup-wallet-page.component';

describe('TopupWalletPageComponent', () => {
  let component: TopupWalletPageComponent;
  let fixture: ComponentFixture<TopupWalletPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopupWalletPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupWalletPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
