import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'admin-home-components',
  templateUrl: './admin-home-components.component.html',
  styleUrls: ['./admin-home-components.component.scss']
})
export class AdminHomeComponentsComponent implements OnInit {

  
  jwt;

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

  }

}
