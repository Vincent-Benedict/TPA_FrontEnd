import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'point-shop-page',
  templateUrl: './point-shop-page.component.html',
  styleUrls: ['./point-shop-page.component.scss']
})
export class PointShopPageComponent implements OnInit {

  jwt = "";

  constructor() { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")
  }

}
