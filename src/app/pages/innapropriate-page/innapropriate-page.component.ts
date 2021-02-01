import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'innapropriate-page',
  templateUrl: './innapropriate-page.component.html',
  styleUrls: ['./innapropriate-page.component.scss']
})
export class InnapropriatePageComponent implements OnInit {

  jwt = ""
  id;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.jwt = localStorage.getItem("jwt")

  }

}
