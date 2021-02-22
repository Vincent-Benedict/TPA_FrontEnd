import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Script } from 'vm';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'game-detail-components',
  templateUrl: './game-detail-components.component.html',
  styleUrls: ['./game-detail-components.component.scss']
})
export class GameDetailComponentsComponent implements OnInit {


  @Input() id;
  user;
  game;
  mostHelpfulReviews
  recentlyPostedReviews;
  jwt="";
  isAdded;
  isHaving;

  myReview="";

  // ids: Array<number>;
  
  reviewUpvotedHelpful : Array<number> = [] 
  reviewDownvotedHelpful: Array<number> = [] 

  reviewUpvotedRecently : Array<number> = [] 
  reviewDownvotedRecently : Array<number> = [] 


  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.game);
    this.jwt = localStorage.getItem("jwt");

    this.service.getUserByToken(this.jwt).subscribe(async data => {
      this.user = data.data.getUserByToken;
    })
     
    this.service.getGameByIdWithVideoReqAndPicture(this.id).subscribe(async data=>{ 
      this.game = data.data.game;
      // console.log(this.game)
    })

    this.service.getReviewsRecently(this.id, 5).subscribe(async data =>{
      this.recentlyPostedReviews = data.data.reviewsRecently
      // await console.log(this.recentlyPostedReviews)

      for (let i = 0; i < this.recentlyPostedReviews.length; i++) {
        this.reviewUpvotedRecently.push(this.recentlyPostedReviews[i].reviewupvoted)
        this.reviewDownvotedRecently.push(this.recentlyPostedReviews[i].reviewdownvoted)
      }

      // console.log(this.ids)

    })

    this.service.getReviewsUpvoted(this.id, 5).subscribe(async data=>{
      this.mostHelpfulReviews = data.data.reviewsUpvoted
      // await console.log(this.mostHelpfulReviews)

      for (let i = 0; i < this.mostHelpfulReviews.length; i++) {
        this.reviewUpvotedHelpful.push(this.mostHelpfulReviews[i].reviewupvoted)
        this.reviewDownvotedHelpful.push(this.mostHelpfulReviews[i].reviewdownvoted)
      }
      
    })

    
    if(this.jwt != ""){

      this.service.isAddedGameToWishlist(this.jwt, this.id).subscribe(async data =>{

        // this.isAdded 
        const x = data.data.isaddedgametowishlist
  
        if(x == true){
          this.isAdded = "true"
        }else{
          this.isAdded = "false"
        }
  
      })

      this.service.checkUserIsHavingAGame(this.jwt, this.id).subscribe(async data=>{
        const x = data.data.checkuserishavingagame
        if(x == true){
          this.isHaving = "true"
        }else{
          this.isHaving = "false"
        }
  
        // console.log(this.isHaving)
  
      })
    }

    

    
  }



  upvoteHelpful(id:number, i :number){
    this.reviewUpvotedHelpful[i] += 1;

    this.service.updateUpvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })
  }

  downvoteHelpful(id:number, i :number){
    this.reviewDownvotedHelpful[i] += 1;

    this.service.updateDownvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })
  }

  upvoteRecently(id:number, i :number){
    this.reviewUpvotedRecently[i] += 1;

    this.service.updateUpvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })
  }

  downvoteRecently(id:number, i :number){
    this.reviewDownvotedRecently[i] += 1;

    this.service.updateDownvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })
  }


  insert(){
    this.service.insertGameIntoCart(this.game.id, this.game.name, this.game.image, this.game.price, this.game.discount).subscribe(async data=>{
      // await console.log(data)
    })

    // GET RADIO BUTTON BY JAVASCRIPT
    // let x = 1;
    // const y = document.getElementById("radio"+x) as HTMLInputElement
    // y.checked

    this.router.navigate(['/cart']).then(()=>{
      window.location.reload()
    });

  }

  wishlistClicked(){
  
    this.service.insertGameIntoWishlist(this.jwt, this.id).subscribe(async data =>{
    })

    if(this.game.discount > 0){
      this.service.sendEmailWishlist(this.user.email, this.game.name).subscribe(async data => {
        console.log(data)
      })
    }
    
    
    this.isAdded="true";
  }

  redirectToWishlist(){
    this.router.navigate(['/wishlist']);
  }

  submit(){

    if(this.myReview != ''){
      this.service.insertReview(this.jwt, this.myReview, this.id).subscribe(async data=> {

        console.log(data.data)
  
        // nambahin data langsung masuk
        this.recentlyPostedReviews = [...this.recentlyPostedReviews, (data.data as any).insertreview]
      })

      this.service.insertRecentActivity(this.jwt, this.user.username + " Submit a Review on Game " + this.game.name).subscribe(async data => {
        console.log(data.data)
      })

      this.myReview = '';
    }
    
  }

}
