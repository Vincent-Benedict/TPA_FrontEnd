import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'topup-wallet-components',
  templateUrl: './topup-wallet-components.component.html',
  styleUrls: ['./topup-wallet-components.component.scss']
})
export class TopupWalletComponentsComponent implements OnInit {

  code: string = '';
  error: string = '';
  jwt = '';

  data;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")

  }

  submit(){
    
    this.service.getRedeemCodeByString(this.code).subscribe(async data => {
      this.data = data.data.getredeemcodebystring;

      if(this.data.price == 0){
        this.error = "Fill The Code Properly !"
      }else{

        this.service.updateIncreaseUserBalance(this.jwt, this.data.price).subscribe(async data =>{
        })

        this.router.navigate(['/']).then(()=>{
          window.location.reload();
        })
      }
    })

    
  }

}
