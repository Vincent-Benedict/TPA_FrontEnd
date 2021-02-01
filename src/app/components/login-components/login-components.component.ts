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
  error = "";
  
  // FORM GROUP
  /*
  form = this.fb.group({
    accountname: ["", Validators.required],
    password: ["", Validators.required]
  });
  */

  constructor(
    private service: ApolloService,
    private router: Router,
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    localStorage.removeItem("jwt");
  }


  login(){
    this.service.getJWTToken(this.username, this.password).subscribe(async data=>{

      if(data.data.getUser !== "can't find user"){
        localStorage.setItem("jwt", data.data.getUser)
        this.error = "";
        this.router.navigate(['/']);
      }else{
        this.error = data.data.getUser;
      }

    })

    /*
    if(this.form.status == "INVALID"){
      alert("SALAH");
    }else{

    }

    console.log(this.form.get("accountname").value);
    */
    
  }

}
