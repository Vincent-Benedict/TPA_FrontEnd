import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'item-detail-components',
  templateUrl: './item-detail-components.component.html',
  styleUrls: ['./item-detail-components.component.scss']
})
export class ItemDetailComponentsComponent implements OnInit{

  @Input() id;

  item;
  user;
  jwt;

  // Inventory
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


  // UNTUK SELL LISTING DAN BUY LISTING
  sellquantityprice;
  buyquantityprice;

  sellListing;
  buyListing;

  // BUY
  iPay: number;
  iQty: number;

  // ACTIVITY
  activity = [];


  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.jwt = localStorage.getItem("jwt")

    console.log(this.id)

    this.service.getItemDetailById(this.id).subscribe(async data=>{
      this.item = data.data.getgameitembyid;
      // console.log(this.item)
    })

    if(this.jwt){
      this.service.getUserByToken(this.jwt).subscribe(async data => {
        this.user = data.data.getUserByToken;
        // console.log(this.user)
      })
    }

    this.service.getUserByToken(this.jwt).subscribe(async data => {
      this.users = data.data.getUserByToken;
      this.idLogin = this.users.id;

      this.service.getUserGameByUserId(this.idLogin).subscribe(async data => {
        this.games = data.data.getusergamebyuserid;
        this.gameid = this.games[0].game[0].id;
        this.gameName = this.games[0].game[0].name;

        this.getMaxPage();
        
        this.fetchDataForPagination();

      })
    })


    this.service.getAllMarketActivity(this.id).subscribe(async data => {
      const x = data.data.getallmarketactivity;
      for(let i = 0; i<x.length; i++){
        this.activity.push(x[i] as any)
      }
      // console.log(this.activity)
    })

    this.service.subscriptionSetterMarket(this.id).subscribe(data=>{
      this.activity.push((data.data as any).getlastmarketactivity)
      // console.log(this.activity)
    })


    this.service.getSellListingQuantityPriceByItemId(this.id).subscribe(async data => {
      this.sellquantityprice = data.data.getselllistingquantityandpricebyitemid;
      // console.log(this.sellquantityprice);
    })

    this.service.getBuyListingQuantityPriceByItemId(this.id).subscribe(async data => {
      this.buyquantityprice = data.data.getbuylistingquantityandpricebyitemid;
      // console.log(this.buyquantityprice);
    })

    this.service.getSellListingByUserId(this.jwt, this.id).subscribe(async data => {
      this.sellListing = data.data.getselllistingbyuserid;
      // console.log(this.sellListing)
    })

    this.service.getBuyListingByUserId(this.jwt, this.id).subscribe(async data =>{
      this.buyListing = data.data.getbuylistingbyuserid;
      // console.log(this.buyListing)
    })

  }

  showBuyPopup(){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }else{
      let hidden = document.getElementsByClassName('overlay-buy') as HTMLCollectionOf<HTMLElement>;

      hidden[0].style.display = "block";
    }

    
  }

  closeBuyPopup(){
    let hidden = document.getElementsByClassName('overlay-buy') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "none";
  }

  showSellPopup(){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{
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
  
      let hidden = document.getElementsByClassName('overlay-sell') as HTMLCollectionOf<HTMLElement>;
  
      hidden[0].style.display = "block";
    }
  }

  closeSellPopup(){
    let hidden = document.getElementsByClassName('overlay-sell') as HTMLCollectionOf<HTMLElement>;

    this.reset();

    let tab = document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tab.length; i++) {
      tab[i].style.background = "#3a3a3a";
      
    }

    this.click = 0;

    hidden[0].style.display = "none";
  }


  // UNTUK SELL LISTING DAN BUY LISTING









  // BAGIAN INVENTORY

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
      if(this.itemShow){
        this.itemDetail = this.itemShow[0]?.item[0];
      }

      
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

    this.service.insertMarketActivity(this.user.id, this.itemDetail.id, "sell", this.buyerPays).subscribe(async data =>{
      console.log(data);
    })

    this.closeHidden();
    this.closeSellPopup();
    // window.location.reload();
  }

  buyItem(){
    if(this.iPay > 0 && this.iQty > 0){
      this.service.insertBuyListing(this.jwt, this.id, this.iQty, this.iPay).subscribe(async data => {

      })

      this.service.insertMarketActivity(this.user.id, this.id, "buy", this.iPay).subscribe(async data =>{
        console.log(data);
      })

      // console.log(this.iPay)
      this.service.checkIfThereIsSellListing(this.id, Number(this.iPay), Number(this.iQty)).subscribe(async data => {
        console.log(data.data.checkifthereisselllisting);

        if(data.data.checkifthereisselllisting == 1){
          this.service.buySoldItem(this.jwt, this.id, Number(this.iQty), Number(this.iPay)).subscribe(async data => {
            // console.log(data)
          })

          this.service.insertItemNotification(this.user.id, this.id).subscribe(async data => {

          })
        }

      })

      
    }

    this.closeBuyPopup();
  }






  // Style
  myCardListStyle(idx: number){
    // console.log("idx", idx) 
    let styles;
    if(idx % 2 == 0){
      styles = {
        'background-color':'hsla(0,0%,100%,.2)'
      }
    }else{
      styles = {
        'background-color':'#12202d'
      }
    }
    
    return styles
  }



}
