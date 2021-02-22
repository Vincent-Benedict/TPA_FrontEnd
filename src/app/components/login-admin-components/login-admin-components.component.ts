import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'login-admin-components',
  templateUrl: './login-admin-components.component.html',
  styleUrls: ['./login-admin-components.component.scss']
})
export class LoginAdminComponentsComponent implements OnInit {


  username: string = '';
  password: string = '';
  error;

  constructor(
    private service: ApolloService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    localStorage.removeItem("jwt admin");

  }


  login(){

    if(this.username == '' || this.password == ''){
      this.error = 'Please Fill the Form Properly';
    }
    else{
      this.service.getAdmin(this.username, this.password).subscribe(async data=>{

        // console.log(data.data.getadmin)

        if(data.data.getadmin !== "can't find admin"){
          localStorage.setItem("jwt admin", data.data.getadmin)
          this.error = '';

          // Redirect to Admin Home Here !
          console.log("log in as admin !")
 
          this.router.navigate(['/home-admin']).then(() => {
            window.location.reload();
          })
  
        }else{
          this.error = data.data.getadmin;
        }
  
      })
    }
    
  }

}
