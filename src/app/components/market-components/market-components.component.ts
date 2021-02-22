import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'market-components',
  templateUrl: './market-components.component.html',
  styleUrls: ['./market-components.component.scss']
})
export class MarketComponentsComponent implements OnInit {

  /* PAGINATION */

  itemList = [];
  itemShow = [];

  page: number=1;
  limit: number= 5;
  maxPage: number;
  offset: number = 0;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.lastIndex = this.page*this.limit-1;

    // To Get Max Page Of Pagination
    this.service.getAllItemGame().subscribe(async data => {

      this.itemList = data.data.getallgameitem;

      if(this.itemList.length % this.limit != 0){
        this.maxPage = Math.ceil(this.itemList.length/this.limit);
      } else{
        this.maxPage = this.itemList.length/this.limit;
      }
    })

    // The Real Pagination
    this.offset = (this.page - 1) * this.limit;
    this.service.getAllItemGameOffsetLimit(this.offset, this.limit).subscribe(async data => {

      this.itemShow = data.data.getgameitemoffsetlimit;
      
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
      this.service.getAllItemGameOffsetLimit(this.offset, this.limit).subscribe(async data => {
      this.itemShow = data.data.getgameitemoffsetlimit;
    })
  }

  itemDetail(id: number){
    this.router.navigate(['/item-detail/'+id])
  }

}
