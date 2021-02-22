import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

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
