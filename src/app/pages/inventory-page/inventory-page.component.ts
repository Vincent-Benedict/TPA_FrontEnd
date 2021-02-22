import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {

  jwt = "";


  constructor() { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")
  }

}
