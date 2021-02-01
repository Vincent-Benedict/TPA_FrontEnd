import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'search-game-page',
  templateUrl: './search-game-page.component.html',
  styleUrls: ['./search-game-page.component.scss']
})
export class SearchGamePageComponent implements OnInit {
  
  jwt = '';
  name: string = "";
  genre: string = "";
  category: string = "";
  price: number = 1000000;

  constructor(
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt");


    this.actRoute.queryParams.subscribe(params => {
      this.name = params['name']
      this.genre = params['genre']
      this.category = params['category']

      console.log(this.name)
      console.log(this.genre)
      console.log(this.category)
    })
    
  }

}
