import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  jwt = ""

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")

    // console.log(this.jwt);
  }

}
