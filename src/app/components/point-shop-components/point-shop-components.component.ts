import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'point-shop-components',
  templateUrl: './point-shop-components.component.html',
  styleUrls: ['./point-shop-components.component.scss']
})
export class PointShopComponentsComponent implements OnInit {

  jwt = "";
  user;
  avatar;
  frame;
  background;
  minibackground;
  chatsticker;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt")

    if(this.jwt){
      this.service.getUserByToken(this.jwt).subscribe(async data => {
        this.user = data.data.getUserByToken;
      })
    }
    

    this.service.getAllShopAvatar().subscribe(async data =>{
      this.avatar = data.data.getallshopavatar;
      // console.log(this.avatar)
    })

    this.service.getAllShopFrame().subscribe(async data =>{
      this.frame = data.data.getallshopframe;
      // console.log(this.frame)
    })

    this.service.getAllShopBackground().subscribe(async data => {
      this.background = data.data.getallshopbackground;
    })

    this.service.getAllShopMiniBackground().subscribe(async data => {
      this.minibackground = data.data.getallshopminibackground;
    })

    this.service.getAllShopChatSticker().subscribe(async data => {
      this.chatsticker = data.data.getallshopchatsticker;
    })
  }

  buyAvatar(){
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
  }


  buyFrame(c: any){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{

      this.service.insertUserFrame(this.jwt, c?.frameimage).subscribe(async data => {
        console.log(data)
      })
  
      this.service.updateDecreaseUserPoint(this.jwt, c?.framepoint).subscribe(async data => {
  
      })
  
      window.location.reload();
    }
  }

  buyBackground(c: any){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{

      this.service.insertUserBackground(this.jwt, c?.backgroundimage).subscribe(async data => {
      })
  
      this.service.updateDecreaseUserPoint(this.jwt, c?.backgroundpoint).subscribe(async data => {
  
      })
  
      window.location.reload();
    }

  }


  buyMiniBackground(c: any){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{

      this.service.insertUserMiniBackground(this.jwt, c?.minibackgroundimage).subscribe(async data => {
      })
  
      this.service.updateDecreaseUserPoint(this.jwt, c?.minibackgroundpoint).subscribe(async data => {
  
      })
  
      window.location.reload();
    }

  }

  buyChatSticker(){
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
  }



}
