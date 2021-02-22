import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-game-page',
  templateUrl: './manage-game-page.component.html',
  styleUrls: ['./manage-game-page.component.scss']
})
export class ManageGamePageComponent implements OnInit {

  jwt;

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

  }

}
