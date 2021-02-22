import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss']
})
export class AdminHomePageComponent implements OnInit {

  jwt;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt admin");
  }

}
