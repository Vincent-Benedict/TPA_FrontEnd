import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit {

  token;
  user;
  
  friendRequest;
  chatNotif;
  giftNotif;
  commentNotif;
  itemNotif;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.token = localStorage.getItem("jwt");

    this.service.getUserByToken(this.token).subscribe(async data => {
      this.user = data.data.getUserByToken;
    })

    this.service.getFriendRequest(this.token).subscribe(async data =>{
      // console.log(data.data.getFriendRequest);
      this.friendRequest = data.data.getFriendRequest;
    })

    this.service.getChatNotification(this.token).subscribe(async data => {
      this.chatNotif = data.data.getchatnotification;
      // console.log(this.chatNotif)
    })

    this.service.getGiftNotification(this.token).subscribe(async data => {
      this.giftNotif = data.data.getgiftnotification;
      // console.log(this.giftNotif)
    })

    this.service.getCommentNotification(this.token).subscribe(async data => {
      this.commentNotif = data.data.getcommentnotification;
      // console.log(this.commentNotif)
    })

    this.service.getItemNotification(this.token).subscribe(async data => {
      this.itemNotif = data.data.getitemnotification;
      // console.log(this.commentNotif)
    })

  }

  // if(localStorage.getItem("jwt") == null){
  //   this.router.navigate(['/login']);
  // }else{
  //   console.log("purchase")
  // }

  acceptRequest(userid: number, friendid: number){
    this.service.insertFriend(userid, friendid).subscribe(async data=>{
    })

    this.service.deleteFriendRequest(userid).subscribe(async data=>{
    })

    window.location.reload();
  }

  navigate(customurl: string){
    this.router.navigate(['/profile/'+customurl]).then(() => {
      window.location.reload();
    })
  }


  goChat(id: number){

    this.service.deleteChatNotification(this.user.id, id).subscribe(async data => {

    })

    this.router.navigate(["/chat/"+id]).then(()=>{
      window.location.reload();
    })
  }


  redirectToProfile(id: number){
    this.service.deleteGiftNotification(this.user.id, id).subscribe(async data => {
    })

    this.router.navigate(['/profile/'+this.user.customurl]).then(() => {
      window.location.reload();
    })
  }


  redirectToProfile2(id: number){
    this.service.deleteCommentNotification(this.user.id, id).subscribe(async data => {
    })

    this.router.navigate(['/profile/'+this.user.customurl]).then(() => {
      window.location.reload();
    })
  }

  redirectToInventory(id: number){
    this.service.deleteItemNotification(id).subscribe(async data => {
    })

    this.router.navigate(['/inventory']).then(() => {
      window.location.reload();
    })
  }

}
