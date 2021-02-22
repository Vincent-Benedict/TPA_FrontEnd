import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'discovery-page',
  templateUrl: './discovery-page.component.html',
  styleUrls: ['./discovery-page.component.scss']
})
export class DiscoveryPageComponent implements OnInit {

  jwt = "";
  state;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")
    this.state = this.actRoute.snapshot.paramMap.get('state');

  }

}
