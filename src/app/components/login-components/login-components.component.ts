import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ApolloService } from '../../services/apollo.service'

@Component({
  selector: 'login-components',
  templateUrl: './login-components.component.html',
  styleUrls: ['./login-components.component.scss']
})
export class LoginComponentsComponent implements OnInit {

  username = "";
  password = "";
  check;
  error = "";
  report;
  formerUser;
  
  // FORM GROUP
  /*
  form = this.fb.group({
    accountname: ["", Validators.required],
    password: ["", Validators.required]
  });
  */

  // SUSPEND USERNAME
  suspendUsername:string = '';
  error2 = "";

  constructor(
    private service: ApolloService,
    private router: Router,
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    localStorage.removeItem("jwt");
    // localStorage.removeItem("username");
    this.username = localStorage.getItem("username");
  }


  login(){
    this.service.getJWTToken(this.username, this.password).subscribe(async data=>{

      if(data.data.getUser !== "can't find user"){
        localStorage.setItem("jwt", data.data.getUser)

        this.service.getReport(data.data.getUser).subscribe(async data2 => {
          this.report = data2.data.getreportbytoken;
          
          if(this.report.length >= 5){
            this.error = "your account is suspended";
          }
          else{

            if(this.check){
              localStorage.removeItem("username");
              localStorage.setItem("username", this.username)
            }

            this.error = "";
            this.router.navigate(['/']);
          }
        })
      }else{
        this.error = data.data.getUser;
      }

    })

    console.log(this.check)
    /*
    if(this.form.status == "INVALID"){
      alert("SALAH");
    }else{

    }

    console.log(this.form.get("accountname").value);
    */
    
  }


  showSuspendPopUp(){
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
    hidden[0].style.display = "block";
  }

  closeSuspendPopUp(){
    let hidden = document.getElementsByClassName('overlay') as HTMLCollectionOf<HTMLElement>;
    hidden[0].style.display = "none";
    this.suspendUsername = '';
  }

  submitSuspend(){
    this.service.checkUserByUsername(this.suspendUsername).subscribe(async data => {
      const x = (data.data as any).checkuserbyusername
      
      if(x == false){
        this.error2 = "There is no user !"
        this.suspendUsername = '';
      }
      else{
        this.error2 = "";
        this.service.insertUnsuspendRequest(this.suspendUsername).subscribe(async data =>{

        })

        window.location.reload();
      }
    })
  }

}
