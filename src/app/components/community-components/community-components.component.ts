import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'community-components',
  templateUrl: './community-components.component.html',
  styleUrls: ['./community-components.component.scss']
})
export class CommunityComponentsComponent implements OnInit {


  jwt = '';

  // Image And Video
  imageandvideos;

  comments = [];
  commentshow = [];

  page: number=1;
  limit: number= 10;
  maxPage: number;
  offset: number = 0;

  comment: string = '';


  // Reviews
  reviews;
  

  // Discussion
  discussions;
  discussionsGameGroup = [];
  gameId: any = [];
  searchString : string = '';

  games;

  gameTitle: number = 1;
  descriptionTitle: string = "";
  descriptionContent: string = "";
  

  
  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt");

    this.service.getAllCommunityImageAndVideo().subscribe(async data => {
      this.imageandvideos = data.data.getcommunityimageandvideo;
      // console.log(this.imageandvideos)
    })

    this.service.getAllReviews(12).subscribe(async data => {
      this.reviews = data.data.getallreview;
      // console.log(this.reviews)
    })

    this.service.getAllDiscussion().subscribe(async data => {
      this.discussions = data.data.getalldiscussion;
      // console.log(this.discussions)

      // Accepts the array and key
      const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );

          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result;
        }, {}); // empty object is the initial value for result object
      };

      // Group by color as key to the person array
      this.discussionsGameGroup = Object.values(groupBy(this.discussions, 'gameid'));
      // console.log(this.discussionsGameGroup)
      // console.log(this.discussionsGameGroup)

      this.gameId = []

      for (let i = 0; i < this.discussionsGameGroup.length; i++) {
        this.gameId.push(this.discussionsGameGroup[i][0].game[0]);
        // console.log(this.discussionsGameGroup[1][0].gameid)
      } 
      // console.log(this.gameId);

    })

    this.service.getGamesOffsetLimit(0, 35).subscribe(async data => {
      this.games = data.data.gamesoffsetlimit;
      console.log(this.games)
    })
  }


  // Image And Video
  showHiddenImgAndVideos(idx: number, contentid: number){
    let hidden = document.getElementsByClassName('overlay-card') as HTMLCollectionOf<HTMLElement>;
    // console.log(hidden[idx])

    var myVideo = document.getElementById("video"+idx) as any; 
    myVideo.play();

    hidden[idx].style.display = "block";

    this.service.getAllCommunityImageAndVideoComment(contentid).subscribe(async data => {
      this.comments = data.data.getallcommunityimageandvideocomment;
      
      if(this.comments.length % this.limit != 0){
        this.maxPage = Math.ceil(this.comments.length/this.limit);
      } else{
        this.maxPage = this.comments.length/this.limit;
      }

      console.log("maxpage", this.maxPage)

    })

    this.offset = (this.page - 1) * this.limit;
    this.service.getCommunityImageAndVideoComment(contentid, this.offset, this.limit).subscribe(async data => {

      this.commentshow = data.data.getcommunityimageandvideocomment;
      console.log(this.commentshow)
    
    })

  }

  removeHiddenImgAndVideos(idx: number){
    let hidden = document.getElementsByClassName('overlay-card') as HTMLCollectionOf<HTMLElement>;

    var myVideo = document.getElementById("video"+idx) as any; 
    myVideo.pause();

    this.offset = 0;
    // this.maxPage = 0;
    this.page = 1;

    // console.log(hidden[idx])
    this.comment = '';
    hidden[idx].style.display = "none";
  }

  prev(contendid: number){
    if(this.page - 1 < 1){
      this.page = 1
    }else{
      this.page -= 1;
    }
    this.fetchData(contendid)
  }

  next(contendid: number){
    if(this.page + 1 > this.maxPage){
      this.page = this.maxPage;
    }else{
      this.page += 1;
    }
    this.fetchData(contendid)
  }

  fetchData(contentid: number){
    
    this.offset = (this.page - 1) * this.limit;
    this.service.getCommunityImageAndVideoComment(contentid, this.offset, this.limit).subscribe(async data => {

      this.commentshow = data.data.getcommunityimageandvideocomment;
    
    })
  }

  insertComment(contentid: number){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }else{
      if(this.comment != ''){
        this.service.insertCommunityImageAndVideoComment(this.jwt, contentid, this.comment).subscribe(async data =>{
        })
  
        this.service.insertRecentActivity(this.jwt, "Posted a Comment on Community And Video !").subscribe(async data =>{
  
        })
      }
  
      this.comment = '';
      window.location.reload();
    }
    
    
  } 

  like(contentid: number){
    this.service.insertCommunityImageAndVideoLike(contentid).subscribe(async data => {
    })

    window.location.reload();
  }

  dislike(contentid: number){
    this.service.insertCommunityImageAndVideoDislike(contentid).subscribe(async data => {
    })

    window.location.reload();
  }


  // REVIEWS
  upvote(id:number){

    this.service.updateUpvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })

    window.location.reload();
  }

  downvote(id:number){

    this.service.updateDownvotedReview(id, 1).subscribe(async data=>{
      console.log(data)
    })

    window.location.reload();
  }

  redirectToReviewDetail(id: number){
    this.router.navigate(['/review-detail/'+id]).then(() => {
      window.location.reload();
    })
  }



  // DISCUSSION
  search(){
    if(this.searchString != ''){
      // console.log(this.searchString)

      this.service.getDiscussionsWithGameName(this.searchString).subscribe(async data => {
        this.discussions = data.data.getdiscussionswithgamename;
  
        // Accepts the array and key
        const groupBy = (array, key) => {
          // Return the end result
          return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
  
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
          }, {}); // empty object is the initial value for result object
        };
  
        // Group by color as key to the person array
        this.discussionsGameGroup = Object.values(groupBy(this.discussions, 'gameid'));
        // console.log(this.discussionsGameGroup)
        // console.log(this.discussionsGameGroup)
  
        
        this.gameId = []
  
        for (let i = 0; i < this.discussionsGameGroup.length; i++) {
          this.gameId.push(this.discussionsGameGroup[i][0].game[0]);
          // console.log(this.discussionsGameGroup[1][0].gameid)
        }
  
        // console.log(this.gameId);
  
      })

    }else{
      this.service.getAllDiscussion().subscribe(async data => {
        this.discussions = data.data.getalldiscussion;
        // console.log(this.discussions)
  
        // Accepts the array and key
        const groupBy = (array, key) => {
          // Return the end result
          return array.reduce((result, currentValue) => {
            // If an array already present for key, push it to the array. Else create an array and push the object
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
              currentValue
            );
  
            // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
            return result;
          }, {}); // empty object is the initial value for result object
        };
  
        // Group by color as key to the person array
        this.discussionsGameGroup = Object.values(groupBy(this.discussions, 'gameid'));
        // console.log(this.discussionsGameGroup)
        // console.log(this.discussionsGameGroup)
  
        this.gameId = []
  
        for (let i = 0; i < this.discussionsGameGroup.length; i++) {
          this.gameId.push(this.discussionsGameGroup[i][0].game[0]);
          // console.log(this.discussionsGameGroup[1][0].gameid)
        }
  
        // console.log(this.gameId);
  
      })
    }
     
  }

  redirectToCommentDetail(id: number){
    console.log(id)

    this.router.navigate(['/discussion-detail/'+id])
  }

  show(){
    // document.body.style.background="rgba(0,0,0,.9)";
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    hidden[0].style.display = "block";
  }

  close(){
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;

    this.gameTitle = 1;
    this.descriptionTitle = "";
    this.descriptionContent = "";

    hidden[0].style.display = "none";
  }

  submit(){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{
      console.log(this.gameTitle)
      console.log(this.descriptionTitle)
      console.log(this.descriptionContent)
  
      this.service.insertDiscussion(this.jwt, this.gameTitle, this.descriptionTitle, this.descriptionContent).subscribe(async data => {
  
      })

      this.service.insertRecentActivity(this.jwt, "Insert a Discussion in Community !").subscribe(async data => {
        
      })
  
      this.gameTitle = 1;
      this.descriptionTitle = "";
      this.descriptionContent = "";
  
      window.location.reload();
    }

    
  }



}
