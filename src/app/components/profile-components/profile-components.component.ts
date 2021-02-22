import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'profile-components',
  templateUrl: './profile-components.component.html',
  styleUrls: ['./profile-components.component.scss']
})
export class ProfileComponentsComponent implements OnInit {

  @Input() customurl;
  id;
  user;
  usergame;
  friends;
  comments;
  jwt='';
  commentContent:string = '';
  reportReason:string = '';


  isFriend = [];
  isFriend2;

  idLogin: number;

  // Pagination
  activity;
  activityShow;
  page: number=1;
  maxPage: number;
  limit: number= 10;
  offset: number = 0;
  timeEach = [];

  constructor(
    private service: ApolloService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {

   this.service.getIdFromCustomUrl(this.customurl).subscribe(async data =>{
     // GET ID FROM CUSTOM URL
     this.id = data.data.getidfromcustomurl

     this.jwt = localStorage.getItem("jwt")

     this.service.getIdFromJWTToken(this.jwt).subscribe(async data=>{
       this.idLogin = data.data.getidfromjwttoken;
 
       this.service.isFriend(this.idLogin, this.id).subscribe(async data => {
         this.isFriend2 = data.data.isfriend;
         // console.log(this.isFriend2)
       })
     })
 
     this.service.getProfileUserById(this.id).subscribe(async data => {
 
      //  console.log("this.id", this.id)
 
       this.user = data.data.getUserById;
       console.log("user", this.user)
       
     })
 
     this.service.getAllActivity(this.id).subscribe(async data => {
       this.activity = data.data.getrecentactivity;
 
       if(this.activity.length % this.limit != 0){
         this.maxPage = Math.ceil(this.activity.length/this.limit);
       } else{
         this.maxPage = this.activity.length/this.limit;
       }
     })
 
     this.offset = (this.page - 1) * this.limit;
     this.service.getActivityOffsetLimit(this.id, this.offset, this.limit).subscribe(async data => {
 
       this.activityShow = data.data.getrecentactivityoffsetlimit;
 
       for (let i = 0; i < this.activityShow.length; i++) {
 
         var c = new Date(this.activityShow[i].createdat)
         // this.activityShow[i].createdat
 
         let time;
 
         if(c.getHours() < 10 && c.getMinutes() < 10){
           time = "0"+c.getHours() + ":" + "0" + c.getMinutes();
         }else if(c.getHours() < 10 && c.getMinutes() >= 10){
           time = "0"+c.getHours() + ":" + c.getMinutes();
         }else if(c.getHours() >= 10 && c.getMinutes() < 10){
           time = c.getHours() + ":" + "0" + c.getMinutes();
         }else{
           time = c.getHours() +":"+ c.getMinutes();
         }
 
         this.timeEach.push(time);
       }
 
     })
 
     this.service.getUserGameByUserId(this.id).subscribe(async data=>{
       this.usergame = data.data.getusergamebyuserid;
       // console.log(this.usergame)
     })
 
     this.service.getFriendsByUserId(this.id).subscribe(async data=>{
       this.friends = data.data.getfriendsbyuserid;
       console.log(this.friends)
 
       for (let i = 0; i < this.friends.length; i++) {
         
         this.service.isFriend(this.idLogin, this.friends[i].friend[0].id).subscribe(async data =>{
           this.isFriend.push(data.data.isfriend);
         })
       }
 
     })
 
     this.service.getCommentsByUserId(this.id).subscribe(async data =>{
       this.comments = data.data.getallcommentsbyuserid
       // console.log(this.comments)
     })

   })
   
  }


  setMyStyle(){
    let styles = {
      'background-color': this.user.usertheme.color,
    };
    return styles;
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

  navigate(customurl: string){

    this.router.navigate(["/profile/"+customurl]).then(()=>{
      window.location.reload();
    })
  }

  chat(id: number){

    this.service.insertChatNotification(id, this.idLogin).subscribe(async data=>{
      console.log(data)
    })

    this.router.navigate(["/chat/"+id]).then(()=>{
      window.location.reload();
    })
  }


  addFriend(id: number){
    console.log("add friend "+id)

    this.service.insertFriendRequest(this.idLogin, id).subscribe(async data => {
      console.log(data)
    })

    window.location.reload();
  }


  submitComment(){
    console.log(this.commentContent)

    this.service.insertComment(this.jwt, this.id, this.commentContent).subscribe(async data =>{
      console.log(data)

      this.comments = [...this.comments, (data.data as any).insertcomment]
    })

    this.service.insertCommentNotification(this.id, this.idLogin).subscribe(async data => {
      
    })

    this.commentContent = ''
  }

  popUpReport(){
    let x = document.getElementsByClassName("report-modal") as HTMLCollectionOf<HTMLElement>;

    x[0].style.display = "block";
  }

  submitReport(){
    let x = document.getElementsByClassName("report-modal") as HTMLCollectionOf<HTMLElement>;

    this.service.insertReport(this.jwt, this.id, this.reportReason).subscribe(async data => {
      console.log(data.data)
    })

    this.reportReason = '';

    x[0].style.display = "none";
  }

  edit(){
    this.router.navigate(["/edit-profile/"+this.customurl]).then(()=>{
      window.location.reload();
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
    this.service.getActivityOffsetLimit(this.id, this.offset, this.limit).subscribe(async data => {

      this.activityShow = data.data.getrecentactivityoffsetlimit;
      
    })
  }


  redirectToFriend(){

    if(this.id == this.idLogin){
      this.router.navigate(["/friends"]).then(()=>{
        window.location.reload();
      })
    }
    
  }






}
