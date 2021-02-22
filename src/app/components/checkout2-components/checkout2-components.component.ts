import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'checkout2-components',
  templateUrl: './checkout2-components.component.html',
  styleUrls: ['./checkout2-components.component.scss']
})
export class Checkout2ComponentsComponent implements OnInit {

  @Input() price;
  jwt;
  idLogin;
  friends;
  choosenFriend;
  user;

  // FORM
  message:string = '';
  sentiment: string = '';
  signature: string = '';
  error: string = '';

  // GAMECART
  gameCart;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.price)

    if(this.price == 0){
      this.router.navigate(['/']);
    }

    this.jwt = localStorage.getItem("jwt");

    this.service.getUserByToken(this.jwt).subscribe(async data => {
      this.user = data.data.getUserByToken;
    })
    
    this.service.getIdFromJWTToken(this.jwt).subscribe(async data=>{
      this.idLogin = data.data.getidfromjwttoken;

      this.service.getFriendsByUserId(this.idLogin).subscribe(async data=>{
        this.friends = data.data.getfriendsbyuserid;

        this.choosenFriend = this.friends[0];
        // console.log(this.friends)
      })

    })

    this.service.getGamesInCart().subscribe(async data=>{
      this.gameCart = data.data.getAllGamesInCart
      // await console.log(data.data.getAllGamesInCart)
    })

  }



  chooseRecipient(c: any){
    this.choosenFriend = c;
    // console.log(this.choosenFriend)
  }

  gift(){

    if(this.message == '' || this.sentiment == '' || this.signature == ''){
      this.error = "Please Fill The Form Properly !";
    }
    else{

      this.error = '';

      for (let i = 0; i < this.gameCart.length; i++) {
        this.service.insertUserGameById(this.choosenFriend.friend[0].id, this.gameCart[i].gameid).subscribe(async data=> {
          // await console.log(data);
        })
        this.service.insertRecentActivityById(this.choosenFriend.friend[0].id, this.choosenFriend.friend[0].username + " just played " + this.gameCart[i].name + " game").subscribe(async data =>{
        })
      }
  
      this.service.deleteAllGameFromCart().subscribe(async data=> {
      })

      this.service.sendEmailTransaction(this.user.email, this.choosenFriend.friend[0].realname, this.message, this.sentiment, this.signature).subscribe(async data => {
        console.log(data)
      })

      this.service.insertGiftNotification(this.choosenFriend.friend[0].id, this.idLogin).subscribe(async data=>{

      })
  
      this.router.navigate(['/']).then(()=>{
        window.location.reload()
      })
    }

    


  }


}
