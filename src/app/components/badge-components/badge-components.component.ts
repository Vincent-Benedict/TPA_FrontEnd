import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'badge-components',
  templateUrl: './badge-components.component.html',
  styleUrls: ['./badge-components.component.scss']
})
export class BadgeComponentsComponent implements OnInit {

  jwt = "";
  allBadge;
  badgeDetail;
  badgeCard;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }

    this.jwt = localStorage.getItem("jwt")

    this.service.getAllUserBadgeByUserId(this.jwt).subscribe(async data =>{
      this.allBadge = data.data.getalluserbadgebyuserid;
      console.log(this.allBadge)

      this.service.getUserBadgeById(this.allBadge[0].id).subscribe(async data => {
        this.badgeDetail = data.data.getuserbadgebyid;
        // console.log(this.badgeDetail)

        this.service.getBadgeCardById(this.badgeDetail.id).subscribe(async data =>{
          this.badgeCard = data.data.getbadgecardbyid;
          // console.log(this.badgeCard)
        })
      })
    })
  
  }

  setDetail(c: any){
    this.badgeDetail = c;

    this.service.getBadgeCardById(this.badgeDetail.id).subscribe(async data =>{
      this.badgeCard = data.data.getbadgecardbyid;
    })
  }

}
