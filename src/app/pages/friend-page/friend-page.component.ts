import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.scss']
})
export class FriendPageComponent implements OnInit {

  jwt = "";

  constructor() { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")
  }

}
