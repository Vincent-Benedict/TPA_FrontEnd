import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'badge-page',
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss']
})
export class BadgePageComponent implements OnInit {

  jwt = ""

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")

  }

}
