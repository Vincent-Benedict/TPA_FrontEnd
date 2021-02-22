import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  jwt = "";
  customurl;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.customurl = this.actRoute.snapshot.paramMap.get('customurl');
    this.jwt = localStorage.getItem("jwt")
  }

}
