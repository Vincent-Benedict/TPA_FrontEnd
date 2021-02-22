import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators'

import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'search-game-components',
  templateUrl: './search-game-components.component.html',
  styleUrls: ['./search-game-components.component.scss']
})
export class SearchGameComponentsComponent implements OnInit {

  @Input() name;
  @Input() genre;
  @Input() category;
  @Input() price;

  gamesList = [];
  gameShow = [];

  limit: number= 0;
  firstIndex: number = 0;
  lastIndex: number = 0;
  offset: number=0;
  fetchgames = new EventEmitter<void>();

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.gamesList = [];
    // this.gameShow = [];

    this.fetchgames.pipe(debounceTime(500)).subscribe(() => {

      if(this.name=="allGames"){
        this.name = '';
      }

      this.limit += 10;

      this.service.getGameByFilter(this.offset, this.limit, this.name, this.price, this.category, this.genre).subscribe(async data =>{
        
        console.log(data.data.gamesByFilter)  
        this.gameShow = data.data.gamesByFilter;

        
      })
    })

    this.fetchgames.emit();
  }

  submit(){

   this.gameShow = [];

    if(this.name=="allGames"){
      this.name = '';
    }

    this.limit = 0;

    this.fetchgames.emit();
    
  }

  @HostListener('window:scroll') 
    scrollHandler() {

      if( Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight - 1){
        this.fetchgames.emit();
      }
    }

  loadMore(){
    this.lastIndex = this.firstIndex + this.limit - 1;
    for (let i = this.firstIndex; i <= this.lastIndex && i<this.gamesList.length; i++) {
      this.gameShow.push(this.gamesList[i])
    }
    this.firstIndex = this.lastIndex+1;
  }





  hovered(idx : number){
    let hidden = document.getElementsByClassName('card-hidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    hidden[idx].style.display = "block";
  }

  leave(idx: number){
    let hidden = document.getElementsByClassName('card-hidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    hidden[idx].style.display = "none";
  }

}
