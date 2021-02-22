import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'discovery-components',
  templateUrl: './discovery-components.component.html',
  styleUrls: ['./discovery-components.component.scss']
})
export class DiscoveryComponentsComponent implements OnInit {


  @Input() state;
  jwt = "";
  title;
  gameTemp = [];
  games = [];

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {  

    if(localStorage.getItem("jwt") == null){
      this.router.navigate(['/login']);
    }

    this.jwt = localStorage.getItem("jwt")

    // console.log(this.state)

    if(this.state == "newrelease"){
      this.service.getGameNewAndTrendings(10).subscribe(async data => {
        this.games = data.data.getgamesnewandtrending;
        this.title = "New Release";
        // console.log(this.games)
      })
    }else if(this.state == "recommend"){
      this.service.getUserGameByUserIdLimit(this.jwt, 10).subscribe(async data => {
        this.gameTemp = data.data.getusergamebyuseridlimit;
        
        for (let i = 0; i < this.gameTemp.length; i++) {
          this.games.push(this.gameTemp[i].game[0]);
          
        }

        console.log(this.games)

        this.title = "Recommended";
        
      })
    }

  }

}
