import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss']
})
export class ManageUserPageComponent implements OnInit {

  jwt;

  constructor() { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

  }

}
