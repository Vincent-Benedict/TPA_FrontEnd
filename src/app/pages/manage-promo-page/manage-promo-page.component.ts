import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-promo-page',
  templateUrl: './manage-promo-page.component.html',
  styleUrls: ['./manage-promo-page.component.scss']
})
export class ManagePromoPageComponent implements OnInit {

  jwt;

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

  }

}
