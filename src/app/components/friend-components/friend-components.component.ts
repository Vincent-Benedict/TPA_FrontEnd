import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'friend-components',
  templateUrl: './friend-components.component.html',
  styleUrls: ['./friend-components.component.scss']
})
export class FriendComponentsComponent implements OnInit {

  jwt = '';
  idLogin;
  user;

  allFriends;
  friendsnumber: number;
  onlineFriends = [];
  offlineFriends = [];

  nameSearchString: string = '';

  reportReason: string = '';

  friendCode: string = '';
  searchedFriend;
  searchedFriendStatus:number = -1;
  error: string = '';

  receivedInvites;
  sentInvites;
  ignored;


  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")

    this.service.getIdFromJWTToken(this.jwt).subscribe(async data=>{
      this.idLogin = data.data.getidfromjwttoken;

      this.service.getProfileUserById(this.idLogin).subscribe(async data => {
        this.user = data.data.getUserById;
      })

      this.service.getFriendsByUserId(this.idLogin).subscribe(async data=>{
        this.allFriends = data.data.getfriendsbyuserid;
        
        this.friendsnumber = this.allFriends.length;

        for (let i = 0; i < this.allFriends.length; i++) {
          
          if(this.allFriends[i].friend[0].status == "online"){
            this.onlineFriends.push(this.allFriends[i].friend[0])
          }else{
            this.offlineFriends.push(this.allFriends[i].friend[0])
          }
          
        }

        // console.log(this.onlineFriends)
        // console.log(this.offlineFriends)
  
      })

    })


    this.service.getFriendRequest(this.jwt).subscribe(async data => {
      this.receivedInvites = data.data.getFriendRequest;
    })

    this.service.getFriendRequestSent(this.jwt).subscribe(async data => {
      this.sentInvites = data.data.getFriendRequestSent;
    })

    this.service.getFriendRequestIgnored(this.jwt).subscribe(async data => {
      this.ignored = data.data.getFriendRequestIgnored;
      console.log("ignored ", this.ignored)
    })








  }




  search(){
    if(this.nameSearchString.length != 0){

      this.onlineFriends = [];
      this.offlineFriends = [];

      this.service.getFriendsByUsername(this.idLogin, this.nameSearchString).subscribe(async data => {
        await console.log(data.data.getfriendsbyusername)

        this.allFriends = data.data.getfriendsbyusername;
        
        this.friendsnumber = this.allFriends.length;

        for (let i = 0; i < this.allFriends.length; i++) {
          
          if(this.allFriends[i].friend[0].status == "online"){
            this.onlineFriends.push(this.allFriends[i].friend[0])
          }else{
            this.offlineFriends.push(this.allFriends[i].friend[0])
          }
          
        }

      })
    }

    else if(this.nameSearchString.length == 0){

      this.onlineFriends = [];
      this.offlineFriends = [];

      this.service.getIdFromJWTToken(this.jwt).subscribe(async data=>{
        this.idLogin = data.data.getidfromjwttoken;
  
        this.service.getFriendsByUserId(this.idLogin).subscribe(async data=>{
          this.allFriends = data.data.getfriendsbyuserid;
          
          this.friendsnumber = this.allFriends.length;
  
          for (let i = 0; i < this.allFriends.length; i++) {
            
            if(this.allFriends[i].friend[0].status == "online"){
              this.onlineFriends.push(this.allFriends[i].friend[0])
            }else{
              this.offlineFriends.push(this.allFriends[i].friend[0])
            }
            
          }
  
          // console.log(this.onlineFriends)
          // console.log(this.offlineFriends)
    
        })
  
      })
    }

  }

  offlineReportClicked(idx: number){
    let hidden = document.getElementsByClassName('offlinehidden') as HTMLCollectionOf<HTMLElement>;
    let hidden2 = document.getElementsByClassName('onlinehidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    for(let i = 0; i<hidden.length; i++){
      hidden[i].style.display = "none";
    }

    for(let i = 0; i<hidden2.length; i++){
      hidden2[i].style.display = "none";
    }

    this.reportReason = '';

    hidden[idx].style.display = "block";
  }

  onlineReportClicked(idx: number){
    let hidden = document.getElementsByClassName('offlinehidden') as HTMLCollectionOf<HTMLElement>;
    let hidden2 = document.getElementsByClassName('onlinehidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    for(let i = 0; i<hidden.length; i++){
      hidden[i].style.display = "none";
    }

    for(let i = 0; i<hidden2.length; i++){
      hidden2[i].style.display = "none";
    }

    this.reportReason = '';

    hidden2[idx].style.display = "block";
  }

  submitReason(reportedid: number){

    this.service.insertReport(this.jwt, reportedid, this.reportReason).subscribe(async data => {
      
    })

    let hidden = document.getElementsByClassName('offlinehidden') as HTMLCollectionOf<HTMLElement>;
    let hidden2 = document.getElementsByClassName('onlinehidden') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])
    for(let i = 0; i<hidden.length; i++){
      hidden[i].style.display = "none";
    }

    for(let i = 0; i<hidden2.length; i++){
      hidden2[i].style.display = "none";
    }

    console.log(reportedid)

    console.log(this.reportReason)
  }

  searchFriendCode(){
    this.service.getUserByFriendCode(this.friendCode).subscribe(async data => {
      this.searchedFriend = data.data.getuserbyfriendcode;
      
      if(this.searchedFriend.id == 0){
        this.error = "There is no friend code like that";
      }
      else{
        this.error = '';
        this.service.isFriend(this.idLogin, this.searchedFriend.id).subscribe(async data => {
        
          if(data.data.isfriend == true){
            this.searchedFriendStatus = 1;
          }else{
            this.searchedFriendStatus = 0;
          }
          
          // console.log(this.searchedFriendStatus)
        })
      }
        
      
      

      // console.log(this.searchedFriend)
    })

    this.friendCode = '';
  }


  redirectProfile(customurl: string){
    this.router.navigate(["/profile/"+customurl]).then(()=>{
      window.location.reload();
    })
  }


  addFriendRequest(id: number){
    console.log("add friend "+id)

    this.service.insertFriendRequest(this.idLogin, id).subscribe(async data => {
      console.log(data)
    })

    window.location.reload();
  }



  accept(userid: number, friendid: number){
    this.service.insertFriend(userid, friendid).subscribe(async data=>{
    })

    this.service.deleteFriendRequest(userid).subscribe(async data=>{
    })

    window.location.reload();
  }

  decline(userid: number, friendid: number){
    this.service.deleteFriendRequest2(userid, friendid).subscribe(async data=>{
      console.log(data)
    })

    window.location.reload();
  }


  ignore(userid: number, friendid: number){

    this.service.insertFriendRequestIgnored(friendid, userid).subscribe(async data => {

    })

    this.service.deleteFriendRequest2(userid, friendid).subscribe(async data=>{
      console.log(data)
    })

    window.location.reload();
  }





}
