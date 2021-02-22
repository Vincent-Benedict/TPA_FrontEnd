import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  jwt = "";

  constructor() { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")
  }

}
