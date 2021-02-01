import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail-page.component.html',
  styleUrls: ['./item-detail-page.component.scss']
})
export class ItemDetailPageComponent implements OnInit {

  id;
  jwt = ""

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.jwt = localStorage.getItem("jwt")
  }

}
