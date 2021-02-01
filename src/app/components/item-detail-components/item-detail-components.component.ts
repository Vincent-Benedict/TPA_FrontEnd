import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'item-detail-components',
  templateUrl: './item-detail-components.component.html',
  styleUrls: ['./item-detail-components.component.scss']
})
export class ItemDetailComponentsComponent implements OnInit{

  @Input() id;

  item;

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    

    this.service.getItemDetailById(this.id).subscribe(async data=>{
      this.item = data.data.getgameitembyid;
      console.log(this.item)
    })

  }

}
