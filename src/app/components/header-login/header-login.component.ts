import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {

  token = "";
  user;

  constructor(
    private service: ApolloService
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem("jwt");

    this.service.getUserByToken(this.token).subscribe(async data => {
      this.user = data.data.getUserByToken;
    })

  }

  // if(localStorage.getItem("jwt") == null){
  //   this.router.navigate(['/login']);
  // }else{
  //   console.log("purchase")
  // }



}
