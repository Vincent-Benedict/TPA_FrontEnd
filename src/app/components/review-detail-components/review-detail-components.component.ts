import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'review-detail-components',
  templateUrl: './review-detail-components.component.html',
  styleUrls: ['./review-detail-components.component.scss']
})
export class ReviewDetailComponentsComponent implements OnInit {
  
  @Input() id;
  review;

  jwt;

  allReviewComment = [];
  reviewCommentShow = [];

  page: number=1;
  limit: number= 10;
  maxPage: number;
  offset: number = 0;

  comment: string = '';

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt")
    
    this.service.getReviewById(this.id).subscribe(async data =>{
      this.review = data.data.getreviewbyid;
      // console.log(this.review)
    })

    this.service.getAllReviewCommentByReviewId(this.id).subscribe(async data => {
      this.allReviewComment = data.data.getallreviewcommentbyreviewid;
      console.log(this.allReviewComment)

      if(this.allReviewComment.length % this.limit != 0){
        this.maxPage = Math.ceil(this.allReviewComment.length/this.limit);
      } else{
        this.maxPage = this.allReviewComment.length/this.limit;
      }
    })

    this.offset = (this.page - 1) * this.limit;
    this.service.getReviewCommentByReviewIdOffsetLimit(this.id, this.offset, this.limit).subscribe(async data => {

      this.reviewCommentShow = data.data.getreviewcommentbyreviewidoffsetlimit;
      // console.log(this.reviewCommentShow)
    
    })

  }


  next(){
    if(this.page + 1 > this.maxPage){
      this.page = this.maxPage;
    }else{
      this.page += 1;
    }

    this.fetchData();
  }

  prev(){
    if(this.page - 1 < 1){
      this.page = 1
    }else{
      this.page -= 1;
    }

    this.fetchData();
  }

  fetchData(){
    this.offset = (this.page - 1) * this.limit;
    this.service.getReviewCommentByReviewIdOffsetLimit(this.id, this.offset, this.limit).subscribe(async data => {

      this.reviewCommentShow = data.data.getreviewcommentbyreviewidoffsetlimit;
      // console.log(this.reviewCommentShow)
    
    })
  }

  insert(){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{
      this.service.insertreviewcommentbyreviewid(this.jwt, this.id, this.comment).subscribe(async data =>{

      })
  
      this.service.insertRecentActivity(this.jwt, "insert review comment").subscribe(async data =>{
        
      })
  
      window.location.reload()
    }
    
  }

}
