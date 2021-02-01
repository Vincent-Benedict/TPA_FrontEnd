import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'topup-wallet',
  templateUrl: './topup-wallet-page.component.html',
  styleUrls: ['./topup-wallet-page.component.scss']
})
export class TopupWalletPageComponent implements OnInit {
  
  jwt='';

  constructor() { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")
  }

}
