import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'discussion-detail-components',
  templateUrl: './discussion-detail-components.component.html',
  styleUrls: ['./discussion-detail-components.component.scss']
})
export class DiscussionDetailComponentsComponent implements OnInit {

  @Input() id;
  discussion;
  discussionComment;
  comment: string = '';
  jwt="";
  user;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt");

    this.service.getUserByToken(this.jwt).subscribe(async data => {
      this.user = data.data.getUserByToken;
    })

    console.log(this.id)
    this.service.getDiscussionsWithId(this.id).subscribe(async data =>{
      this.discussion = data.data.getdiscussionswithid;
    })

    this.service.getDiscussionsCommentWithDiscussionId(this.id).subscribe(async data => {
      this.discussionComment = data.data.getdiscussionscommentwithdiscussionid;
      // console.log(this.discussionComment)
    })
  }

  postComment(){

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }
    else{
      if(this.comment != ''){
        this.service.insertDiscussionsComment(this.jwt, this.id, this.comment).subscribe(async data=> {
  
          console.log(data)
  
          // nambahin data langsung masuk
          this.discussionComment = [...this.discussionComment, (data.data as any).insertdiscussioncomment]
        })
  
        this.service.insertRecentActivity(this.jwt, this.user.username + " Submit a Comment on Discussion").subscribe(async data => {
          console.log(data.data)
        })
  
        this.comment = '';
      }
    }

    
    
  }

}
