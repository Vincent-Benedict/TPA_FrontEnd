import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ApolloService } from '../../services/apollo.service'
import {Router} from '@angular/router';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  jwt="";

  gameRecommendeds;
  gameOnSales;
  gameCommunityRecommendeds;
  gameNewAndTrendings;
  gameTopSellers;
  gameSpecials;

  gameHoveredReal;
  gameHoveredName = "Heroes of the Three Kingdoms 8";
  gameHoveredImage = "side-image5";
  gameHoveredOverall = "";
  gameHoveredCategory = "";

  gameHoveredReal2;
  gameHoveredName2 = "Rust";
  gameHoveredImage2 = "side-image1";
  gameHoveredOverall2 = "";
  gameHoveredCategory2 = "";

  gameHoveredReal3;
  gameHoveredName3 = "UBOAT";
  gameHoveredImage3 = "side-image1";
  gameHoveredOverall3 = "";
  gameHoveredCategory3 = "";

  gameSearchString:string ='';
  gameSearched;


  // x:number = 0;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt");

    this.service.getGameRecommendeds(8).subscribe(async data =>{
      this.gameRecommendeds = data.data.getgamesbyfeatureandrecommend;
      // console.log(this.gameRecommendeds)
    })

    this.service.getGameOnSales(6).subscribe(async data =>{
      this.gameOnSales = data.data.getgamesspecialoffer;
    })

    this.service.getGameCommunityRecommendeds(6).subscribe(async data =>{
      this.gameCommunityRecommendeds = data.data.gamesByStatusLimit;
    })

    this.service.getGameNewAndTrendings(5).subscribe(async data =>{
      this.gameNewAndTrendings = data.data.getgamesnewandtrending;
      // console.log(this.gameNewAndTrendingsName)
      //  await console.log(data)
    })

    this.service.getGameTopSellers(5).subscribe(async data =>{
      this.gameTopSellers = data.data.gamesByStatusLimit;
      // console.log(this.gameTopSellers)
      //  await console.log(data)
    })

    this.service.getGameSpecialsDiscountLimit(50, 5).subscribe(async data =>{
      this.gameSpecials = data.data.gamesByStatusDiscountLimit;
      // console.log(this.gameSpecials)
      //  await console.log(data)
    })

    this.service.getGameHovered(35).subscribe(async data =>{ 
      this.gameHoveredReal = data.data.game;
      this.gameHoveredName = this.gameHoveredReal.name;
      this.gameHoveredImage = this.gameHoveredReal.sideimage;
      this.gameHoveredOverall = this.gameHoveredReal.overall;
      this.gameHoveredCategory = this.gameHoveredReal.category;
    })

    this.service.getGameHovered(21).subscribe(async data =>{ 
      this.gameHoveredReal2 = data.data.game;
      this.gameHoveredName2 = this.gameHoveredReal2.name;
      this.gameHoveredImage2 = this.gameHoveredReal2.sideimage;
      this.gameHoveredOverall2 = this.gameHoveredReal2.overall;
      this.gameHoveredCategory2 = this.gameHoveredReal2.category;
    })

    this.service.getGameHovered(26).subscribe(async data =>{ 
      this.gameHoveredReal3 = data.data.game;
      this.gameHoveredName3 = this.gameHoveredReal3.name;
      this.gameHoveredImage3 = this.gameHoveredReal3.sideimage;
      this.gameHoveredOverall3 = this.gameHoveredReal3.overall;
      this.gameHoveredCategory3 = this.gameHoveredReal3.category;
    })

  }


  // countClick(y:number=0){
  //   this.service.getGameNewAndTrendingsCategory(y).subscribe(async data =>{
  //     this.gameCategory = data.data.gameNewAndTrending.category;
  //     // console.log(this.gameCategory);
  //   })
  // }

  goSearchGenre(genre: string){
    this.router.navigate(['/searchgame'],{queryParams: {name: "", category: "", price: 10000000, genre: genre}});
  }

  goSearchCategory(category: string){
    this.router.navigate(['/searchgame'],{queryParams: {name: "", category: category, price: 10000000, genre:""}});
  }
  
  goSearch(){
    if(this.gameSearchString == ""){
      this.router.navigate(['/searchgame'],{queryParams: {name: "allGames", category: "", price: 10000000, genre: ""}});
    }else{
      this.router.navigate(['/searchgame'],{queryParams: {name: this.gameSearchString, category: "", price: 10000000, genre: ""}});
    }
  }

  hovered(y:number){
    this.service.getGameHovered(y).subscribe(async data =>{
      this.gameHoveredReal = data.data.game;
      this.gameHoveredName = this.gameHoveredReal.name;
      this.gameHoveredImage = this.gameHoveredReal.sideimage;
      this.gameHoveredOverall = this.gameHoveredReal.overall;
      this.gameHoveredCategory = this.gameHoveredReal.category;
      // await console.log(data.data.game)
    })
  }

  hovered2(y:number){
    this.service.getGameHovered(y).subscribe(async data =>{
      this.gameHoveredReal2 = data.data.game;
      this.gameHoveredName2 = this.gameHoveredReal2.name;
      this.gameHoveredImage2 = this.gameHoveredReal2.sideimage;
      this.gameHoveredOverall2 = this.gameHoveredReal2.overall;
      this.gameHoveredCategory2 = this.gameHoveredReal2.category;
      // await console.log(data.data.game)
    })
  }

  hovered3(y:number){
    this.service.getGameHovered(y).subscribe(async data =>{
      this.gameHoveredReal3 = data.data.game;
      this.gameHoveredName3 = this.gameHoveredReal3.name;
      this.gameHoveredImage3 = this.gameHoveredReal3.sideimage;
      this.gameHoveredOverall3 = this.gameHoveredReal3.overall;
      this.gameHoveredCategory3 = this.gameHoveredReal3.category;
      // await console.log(data.data.game)
    })
  }


  search(){
    
    if(this.gameSearchString.length !=0){
      this.service.getGameByNameLimit(this.gameSearchString, 5).subscribe(async data=>{
        this.gameSearched = data.data.gamesByNameLimit;
        // console.log(this.gameSearched)
      })
    }

    if(this.gameSearchString.length == 0){
      this.gameSearched=[];
    }
    
  }

  inappropriateControl(id: number, inappropriate: string){
    if(inappropriate == "yes"){
      this.router.navigate(['/inappropriate/'+id]);
    }else{
      this.router.navigate(['/gamedetail/'+id]);
    }
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
  
  goToWishlist(){
    this.router.navigate(['/wishlist']);
  }

}
