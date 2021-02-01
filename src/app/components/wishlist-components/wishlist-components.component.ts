import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'wishlist-components',
  templateUrl: './wishlist-components.component.html',
  styleUrls: ['./wishlist-components.component.scss']
})
export class WishlistComponentsComponent implements OnInit {


  jwt="";
  data;
  wishlist;

  constructor(
    private service: ApolloService,
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt");

    this.service.getUsernameAndWishlist(this.jwt).subscribe(async data => {
      this.data = data.data.getUserByToken;
      this.wishlist = this.data.wishlist;
      console.log(this.data)
    })

  }

}
