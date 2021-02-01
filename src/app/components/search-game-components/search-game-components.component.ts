import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  limit: number= 10;
  firstIndex: number = 0;
  lastIndex: number = 0;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gamesList = [];
    this.gameShow = [];
    if(this.name == "allGames") {
      this.service.getAllGames().subscribe(async data =>{
        this.gamesList = [];
        this.gameShow = [];
        
        this.gamesList = data.data.games;
        console.log(data)
        this.loadMore();
        
      })
    }else{
      this.service.getGameByFilter(this.name, this.price, this.category, this.genre).subscribe(async data =>{
        this.gamesList = [];
        this.gameShow = [];
        
        this.gamesList = data.data.gamesByFilter;
        
        this.lastIndex = this.firstIndex + this.limit - 1;
        
        this.submit();
        
      })
    }

    
  }

  submit(){

   this.gamesList = [];
   this.gameShow = [];

    if(this.name=="allGames"){
      this.name = '';
    }

    this.service.getGameByFilter(this.name, this.price, this.category, this.genre).subscribe(async data=>{
      this.gamesList = data.data.gamesByFilter;
      this.firstIndex = 0;
      this.lastIndex = 0;
      this.loadMore();

      // console.log(this.gamesList)
      
    })
    
  }

  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {

      if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 2){
        // console.log("jos")
        this.loadMore();
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
