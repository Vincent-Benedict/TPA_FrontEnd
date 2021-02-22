import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../services/apollo.service'
// import {Router} from '@angular/router';

@Component({
  selector: 'cart-components',
  templateUrl: './cart-components.component.html',
  styleUrls: ['./cart-components.component.scss']
})
export class CartComponentsComponent implements OnInit {

  games;
  subtotal:number = 0;
  deleteId:number = 0;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {

    // Routing by typescript
    // this.router.navigate(['/login']);
    

    this.service.getGamesInCart().subscribe(async data =>{
      // await console.log(data.data.getAllGamesInCart)
      this.games = data.data.getAllGamesInCart
      
      console.log(this.games)
      
      // console.log(this.games[8])
      for (let i = 0; i < this.games.length; i++) {
        this.subtotal = this.subtotal+ this.games[i].price; 
      }

    })
       
  }


  temp(id:number){

    this.deleteId = id;
    console.log(this.deleteId)

  }

  /* CONFIRMATION DIALOG */
  no(){
    this.deleteId = 0;
  }

  yes(){
    this.service.deleteGameFromCartById(this.deleteId).subscribe(async data=>{
      await console.log(data)
    })

    this.deleteId = 0;

    window.location.reload()
  }


  /* PURCHASING BUTTON */
  purchaseForMyself(){
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/checkout/'+this.subtotal+'/myself']);
    }
  }

  purchaseAsAGift(){
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/checkout/'+this.subtotal+'/gift']);
    }
  }


}
