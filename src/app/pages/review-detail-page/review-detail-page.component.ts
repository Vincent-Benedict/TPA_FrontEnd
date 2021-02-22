import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'review-detail-page',
  templateUrl: './review-detail-page.component.html',
  styleUrls: ['./review-detail-page.component.scss']
})
export class ReviewDetailPageComponent implements OnInit {

  jwt = '';
  id;

  

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt");
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

}
