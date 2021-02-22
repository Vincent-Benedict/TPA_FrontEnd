import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'inventory-components',
  templateUrl: './inventory-components.component.html',
  styleUrls: ['./inventory-components.component.scss']
})
export class InventoryComponentsComponent implements OnInit {

  jwt;

  click: number = 0;

  // GAME
  games;
  gameid;
  gameName;

  // GAMEITEM
  allgameitem;
  itemShow = [];

  // GameItemPagination
  page: number=1;
  limit: number= 4;
  maxPage: number;
  offset: number = 0;

  // ITEM DETAIL
  itemDetail;


  // USER
  idLogin;
  users;

  // SEARCH
  searchString: string = '';

  // RECEIVED AND BUYER PAYS
  received: number;
  buyerPays: number;


  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")

    this.service.getUserByToken(this.jwt).subscribe(async data => {
      this.users = data.data.getUserByToken;
      this.idLogin = this.users.id;

      this.service.getUserGameByUserId(this.idLogin).subscribe(async data => {
        this.games = data.data.getusergamebyuserid;
        this.gameid = this.games[0].game[0].id;
        this.gameName = this.games[0].game[0].name;

        this.getMaxPage();
        

        // console.log("this limit", this.limit)
        this.fetchDataForPagination();

      })
    })

    

  }

  reset(){
    this.page = 1;
    this.offset = 0;
  }

  initTabStyles(idx: number){
    let tab = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>;

    if(idx == 0 && this.click == 0){
      tab[idx].style.background = "#1f1f1f";
    }
    
  }

  tabClicked(idx: number, id: number){

    this.click += 1;
    this.gameid = id;

    this.gameName = this.games[idx].game[0].name;

    // TAB STYLE receh
    let tab = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tab.length; i++) {
      tab[i].style.background = "#3a3a3a";
      
    }
    tab[idx].style.background = "#1f1f1f";

    // RESET
    this.searchString = '';
    this.reset();

    // FOR MAX PAGE
    this.getMaxPage();
    // FETCH DATA FOR PAGINATION
    this.fetchDataForPagination()

  }

  next(){
    if(this.page + 1 > this.maxPage){
      this.page = this.maxPage;
    }else{
      this.page += 1;
      this.fetchDataForPagination();
    }

    

  }

  prev(){
    if(this.page - 1 < 1){
      this.page = 1
    }else{
      this.page -= 1;
      this.fetchDataForPagination();
    }

    
  }
  
  getMaxPage(){
    this.service.getAllUserItemWithGameId(this.jwt, this.gameid).subscribe(async data => {
      this.allgameitem = data.data.getalluseritemwithgameid;
      if(this.allgameitem.length % this.limit != 0){
        this.maxPage = Math.ceil(this.allgameitem.length/this.limit);
      } else{
        this.maxPage = this.allgameitem.length/this.limit;
      }
    })
  }

  clickDetail(c: any){
    console.log(c)
    this.itemDetail = c.item[0];
  }

  fetchDataForPagination(){


    this.offset = (this.page - 1) * this.limit;
    this.service.getUserItemWithGameIdOffsetLimit(this.jwt, this.gameid, this.offset, this.limit).subscribe(async data => {
      this.itemShow = data.data.getuseritemwithgameidoffsetlimit;
      // console.log(this.itemShow)
      this.itemDetail = this.itemShow[0].item[0];
    })
  }



  filterData(){
    
    if(this.searchString != ''){
      console.log(this.searchString)

      this.reset();
      
      this.service.getUserItemWithGameIdByName(this.jwt, this.gameid, this.searchString).subscribe(async data => {
        this.allgameitem = data.data.getuseritemwithgameidbygamename;
        if(this.allgameitem.length % this.limit != 0){
          this.maxPage = Math.ceil(this.allgameitem.length/this.limit);
        } else{
          this.maxPage = this.allgameitem.length/this.limit;
        }
      })

      this.offset = (this.page - 1) * this.limit;
      this.service.getUserItemWithGameIdOffsetLimitByName(this.jwt, this.gameid, this.offset, this.limit, this.searchString).subscribe(async data => {
        this.itemShow = data.data.getuseritemwithgameidoffsetlimitbygamename;
        this.itemDetail = this.itemShow[0].item[0];
      })
      
    }else{
      this.getMaxPage();
        
      this.fetchDataForPagination();

    }
  }


  openHidden(){
    let hidden = document.getElementsByClassName('overlay-hidden') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";
  }

  closeHidden(){
    let hidden = document.getElementsByClassName('overlay-hidden') as HTMLCollectionOf<HTMLElement>;

    this.received = null;
    this.buyerPays = null;

    hidden[0].style.display = "none";
  }

  convertPrice(){
    this.buyerPays = Math.ceil(Number(this.received) + this.received * 10 / 100);
  }


    // SELL ITEM
    sellItem(){
      this.service.insertSellListing(this.jwt, this.itemDetail.id, 1, this.buyerPays).subscribe(async data =>{
        console.log(data.data)
      })

      this.service.insertMarketActivity(this.idLogin, this.itemDetail.id, "sell", this.buyerPays).subscribe(async data =>{
        console.log(data);
      })
  
      this.closeHidden();
      window.location.reload();
    }
  



}
