import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'discussion-detail-page',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit {

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
