import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  jwt = ""

  price;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.price = this.actRoute.snapshot.paramMap.get('price');
    this.jwt = localStorage.getItem("jwt")

    
  }

}
