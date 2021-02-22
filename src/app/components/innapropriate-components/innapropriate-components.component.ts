import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'innapropriate-components',
  templateUrl: './innapropriate-components.component.html',
  styleUrls: ['./innapropriate-components.component.scss']
})
export class InnapropriateComponentsComponent implements OnInit {

  @Input() id;
  game;
  date;
  error = "";

  constructor(
    private service: ApolloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getGameById(this.id).subscribe(async data=>{
      this.game = data.data.game;
    })
  }


  validateAge(){
    var d = new Date(this.date);

    

    if(d.toString() == "Invalid Date"){
      console.log("no date like that")
      this.error = "Please choose the date !";
    }else{
      this.error = "";

      var year= d.getFullYear();
      var yearNow = new Date().getFullYear();

      if(yearNow-year >= 17){
        this.router.navigate(['/gamedetail/'+this.game.id]);
      }else{
        this.router.navigate(['/']);
      }

    }
  }

  cancel(){
    this.router.navigate(['/']);
  }

}
