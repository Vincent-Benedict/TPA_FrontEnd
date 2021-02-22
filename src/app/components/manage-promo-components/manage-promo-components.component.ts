import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'manage-promo-components',
  templateUrl: './manage-promo-components.component.html',
  styleUrls: ['./manage-promo-components.component.scss']
})
export class ManagePromoComponentsComponent implements OnInit {

  jwt;
  
  gamePromoList = [];
  gamePromoShow = [];

  page: number=1;
  limit: number= 5;
  maxPage: number;
  offset: number = 0;

  // INSERT
  games;
  selectedId:number;
  promo: number = 1;

  // DELETE
  selectedDeletedId: number;

  // UPDATE
  updateGame;
  updatePromo;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

    if(!this.jwt){
      this.router.navigate(['/login-admin']).then(() => {
        window.location.reload()
      })
    }

    this.service.getAllGames().subscribe(async data => {
      this.games = data.data.games;
    })

    this.service.getAllPromoGames("abc").subscribe(async data =>{
      this.gamePromoList = data.data.getallpromogames;
      // console.log(this.gamePromoList)

      if(this.gamePromoList.length % this.limit != 0){
        this.maxPage = Math.ceil(this.gamePromoList.length/this.limit);
      } else{
        this.maxPage = this.gamePromoList.length/this.limit;
      }

    })

    this.offset = (this.page - 1) * this.limit;
    this.service.getPromoGamesOffsetLimit("abc", this.offset, this.limit).subscribe(async data => {

      this.gamePromoShow = data.data.getpromogamesoffsetlimit;
      // console.log(this.gamePromoShow)
      
    })
  }



  next(){

    if(this.page + 1 > this.maxPage){
      this.page = this.maxPage;
    }else{
      this.page += 1;
    }

    this.fetchData()
  }

  prev(){
    if(this.page - 1 < 1){
      this.page = 1
    }else{
      this.page -= 1;
    }
    
    this.fetchData()
  }

  fetchData(){
    
    this.offset = (this.page - 1) * this.limit;
      this.service.getPromoGamesOffsetLimit("abc", this.offset, this.limit).subscribe(async data => {
      this.gamePromoShow = data.data.getpromogamesoffsetlimit;
    })
  }

  // INSERET
  insertPromo(){
    // console.log(this.selectedId);
    // console.log(this.promo)

    this.service.insertUpdateDeletePromo(this.selectedId, this.promo).subscribe(async data =>{

    })

    window.location.reload();

  }

  // DELEETE
  showPopUpDelete(c:any){
    this.selectedDeletedId = c?.id;

    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";

  }

  closePopUpDelete(){
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "none";
  }

  deleteTheGamePromo(){
    this.service.insertUpdateDeletePromo(this.selectedDeletedId, 0).subscribe(async data =>{

    })

    this.closePopUpDelete();
    window.location.reload();
  }


  // UPDATE
  showPopUpUpdate(c: any){

    this.updateGame = c;
    console.log(this.updateGame)
    this.updatePromo = c.discount;

    let hidden = document.getElementsByClassName('overlay2') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";
  }

  closePopUpUpdate(){

    let hidden = document.getElementsByClassName('overlay2') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "none";

  }

  funcUpdatePromo(){
    this.service.insertUpdateDeletePromo(this.updateGame?.id, this.updatePromo).subscribe(async data =>{

    })

    this.closePopUpUpdate();

    window.location.reload();
  }

}
