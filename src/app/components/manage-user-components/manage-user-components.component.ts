import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'manage-user-components',
  templateUrl: './manage-user-components.component.html',
  styleUrls: ['./manage-user-components.component.scss']
})
export class ManageUserComponentsComponent implements OnInit {

  jwt;
  userList = [];
  userShow = [];

  // PAGINATION USER
  page: number=1;
  limit: number= 2;
  maxPage: number;
  offset: number = 0;

  reportDetail;



  // SUSPEND REQUEST
  suspendRequest;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.jwt = localStorage.getItem("jwt admin");

    if(!this.jwt){
      this.router.navigate(['/login-admin']).then(() => {
        window.location.reload()
      })
    }

    this.service.getUsers().subscribe(async data => {
      this.userList = data.data.getusers;
      // console.log(this.userList)

      if(this.userList.length % this.limit != 0){
        this.maxPage = Math.ceil(this.userList.length/this.limit);
      } else{
        this.maxPage = this.userList.length/this.limit;
      }

    })

    this.fetchData();


    
    this.service.getAllUnsuspendRequest().subscribe(async data =>{
      this.suspendRequest = data.data.getallunsuspendrequest;
      console.log(this.suspendRequest)
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
    this.service.getUserOffsetLimit(this.offset, this.limit).subscribe(async data => {

      this.userShow = data.data.getuseroffsetlimit;
      this.service.getReportByReportedId(this.userShow[0].id).subscribe(async data =>{
        this.reportDetail = data.data.getreportbyreportedid;
        // console.log(this.reportDetail)
      })
      
    })   
  }


  changeDetailReport(c: number){
    this.service.getReportByReportedId(c).subscribe(async data =>{
      this.reportDetail = data.data.getreportbyreportedid;
    })
  }


  approve(id :number, idx: number){

    console.log(id)
    console.log(idx)

    this.service.deleteReportByReportedId(id).subscribe(async data => {

    })

    this.service.deleteUnsuspendRequest(idx).subscribe(async data =>{

    })

    window.location.reload();
  }

  reject(id :number){
    this.service.deleteUnsuspendRequest(id).subscribe(async data =>{

    })

    window.location.reload();
  }

}
