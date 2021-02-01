import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'chat-components',
  templateUrl: './chat-components.component.html',
  styleUrls: ['./chat-components.component.scss']
})
export class ChatComponentsComponent implements OnInit {

  @Input() id;
  jwt = '';

  user;
  friend;

  message: string = '';

  chat = []
 
  constructor(
    private service: ApolloService,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem("jwt");

    this.service.getUserByToken(this.jwt).subscribe(async data=>{
      this.user = data.data.getUserByToken;

      console.log("user", this.user.id, this.id)

      this.service.getAllChat(this.user.id, this.id).subscribe(async data => {
        const x = data.data.getallchat;
        for(let i = 0; i<x.length; i++){
          this.chat.push(x[i] as any)
        }
      })

      this.service.subscriptionSetter(this.user.id, this.id).subscribe(data=>{
        this.chat.push((data.data as any).getlastchat)
        console.log(this.chat)
      })
    })

    this.service.getUserById(this.id).subscribe(async data=>{
      this.friend = data.data.getUserById;
    })

    
  }


  submit(){
    this.service.insertChat(this.message, this.user.id, this.id).subscribe(async data=> {
      console.log("mutation", data)
    })

    this.message = '';
  }
}
