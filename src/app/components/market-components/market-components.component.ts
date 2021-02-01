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
  firstIndex: number = 0;
  limit: number= 5;
  lastIndex: number;
  maxPage: number;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.lastIndex = this.page*this.limit-1;

    this.service.getAllItemGame().subscribe(async data => {
      this.itemList = data.data.getallgameitem;

      for (let i = this.firstIndex; i <= this.lastIndex; i++) {
        this.itemShow.push(this.itemList[i])
      }

      if(this.itemList.length % this.limit != 0){
        this.maxPage = Math.ceil(this.itemList.length/this.limit);
      } else{
        this.maxPage = this.itemList.length/this.limit;
      }

      
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
    this.itemShow = [];
    this.lastIndex = this.page*this.limit - 1;
    this.firstIndex =  this.lastIndex - this.limit+1;
  
    for(let i=this.firstIndex; i<=this.lastIndex; i++){
      this.itemShow.push(this.itemList[i])
    }
  }

  itemDetail(id: number){
    this.router.navigate(['/item-detail/'+id])
  }

}
