import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'profile-components',
  templateUrl: './profile-components.component.html',
  styleUrls: ['./profile-components.component.scss']
})
export class ProfileComponentsComponent implements OnInit {

  @Input() id;
  user;
  usergame;
  friends;
  comments;
  jwt='';

  idLogin: number;
  

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")

    this.service.getIdFromJWTToken(this.jwt).subscribe(async data=>{
      this.idLogin = data.data.getidfromjwttoken;
      // console.log(this.idLogin)
      console.log(data.data.getidfromjwttoken)
    })

    this.service.getProfileUserById(this.id).subscribe(async data => {
      this.user = data.data.getUserById;
    })

    this.service.getUserGameByUserId(this.id).subscribe(async data=>{
      this.usergame = data.data.getusergamebyuserid;
      // console.log(this.usergame)
    })

    this.service.getFriendsByUserId(this.id).subscribe(async data=>{
      this.friends = data.data.getfriendsbyuserid;
      // console.log(this.friends)
    })

    this.service.getCommentsByUserId(this.id).subscribe(async data =>{
      this.comments = data.data.getallcommentsbyuserid
      // console.log(this.comments)
    })
  }

  hovered(idx : number){
    let hidden = document.getElementsByClassName('user-friend-card-hidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    hidden[idx].style.display = "block";
  }

  leave(idx: number){
    let hidden = document.getElementsByClassName('user-friend-card-hidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    hidden[idx].style.display = "none";
  }

  navigate(id: number){
    console.log(id)

    this.router.navigate(["/profile/"+id]).then(()=>{
      window.location.reload();
    })
  }

  chat(id: number){
    console.log("start chatting with "+id)

    this.router.navigate(["/chat/"+id]).then(()=>{
      window.location.reload();
    })
  }

}
