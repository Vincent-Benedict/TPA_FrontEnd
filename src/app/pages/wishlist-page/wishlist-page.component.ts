import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {

  jwt = ""

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")

  }

}
