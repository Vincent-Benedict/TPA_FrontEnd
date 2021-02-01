import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Script } from 'vm';
import { ApolloService } from '../../services/apollo.service'


@Component({
  selector: 'checkout-components',
  templateUrl: './checkout-components.component.html',
  styleUrls: ['./checkout-components.component.scss']
})
export class CheckoutComponentsComponent implements OnInit {

  @Input() price;
  gameCart;
  jwt="";
  user;
  changeMethods: boolean = false;



  paymentMethod: string = 'Visa';
  paymentCard: string = '';
  paymentName: string = '';
  paymentCity: string = '';
  paymentAddress: string = '';
  paymentZip: string = '';
  paymentCountry: string = '';
  paymentPhone: string = '';
  paymentChecked;


  error: string = '';




  constructor(
    private router: Router,
    private service: ApolloService,
  ) { }

  ngOnInit(): void {

    
    if(this.price == 0){
      this.router.navigate(['/']);
    }

    this.jwt = localStorage.getItem("jwt");
    this.service.getGamesInCart().subscribe(async data=>{
      this.gameCart = data.data.getAllGamesInCart
      // await console.log(data.data.getAllGamesInCart)
    })

    this.service.getUserByToken(this.jwt).subscribe(async data =>{
      this.user = data.data.getUserByToken
    })


  }


  yes(){
    for (let i = 0; i < this.gameCart.length; i++) {
      this.service.insertUserGame(this.jwt, this.gameCart[i].gameid).subscribe(async data=> {
        // await console.log(data);
      })
    }

    this.service.deleteAllGameFromCart().subscribe(async data=> {
      await console.log(data)
    })

    this.service.updateDecreaseUserBalance(this.jwt, this.price).subscribe(async data =>{
      await console.log(data)
    })
    
    
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })

    // this.router.navigate(['/'])


  }

  no(){
    this.router.navigate(['/cart'])
  }

  submitForm(){

    if(this.paymentMethod == '' || this.paymentCard == '' || this.paymentName == '' ||
       this.paymentCity == '' || this.paymentAddress == '' || this.paymentZip == '' ||
       this.paymentCountry == '' || this.paymentPhone == '' || this.paymentChecked != true){
          this.error = 'Please fill all the requirements !'
       }
    else{
      this.error = ''

      for (let i = 0; i < this.gameCart.length; i++) {
        this.service.insertUserGame(this.jwt, this.gameCart[i].gameid).subscribe(async data=> {
        })
      }
  
      this.service.deleteAllGameFromCart().subscribe(async data=> {
        await console.log(data)
      })

      this.router.navigate(['/']).then(()=>{
        window.location.reload()
      })
  
    }

  }

  changeMethod(){
    this.changeMethods = true;
  }

}
