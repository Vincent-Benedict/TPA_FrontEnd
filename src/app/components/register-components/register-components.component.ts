import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'register-components',
  templateUrl: './register-components.component.html',
  styleUrls: ['./register-components.component.scss']
})
export class RegisterComponentsComponent implements OnInit {

  aFormGroup: FormGroup;

  siteKey:string = '';
  theme: string = '';

  // FORM 1
  email: string = '';
  confirmEmail: string = '';
  country: string = "";
  checked;

  // FOR ERROR
  error;

  // FORM 2
  account: string = '';
  password: string = '';
  confirmPassword: string = '';
  otpCode: string = '';

  realOtpCode: string = '';

  // FOR ERROR
  error2;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApolloService,
    private router: Router
    ) { 
    this.siteKey = '6Ldh7DUaAAAAAIoLgQvsIvRCW7O0oJVvKtalY_pI';
    this.theme = 'Dark';
  }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

  }

  continue(){

    if(this.email == '' || this.confirmEmail == '' || this.country == '' || !this.checked){
      this.error="Please Fill The Form Properly !"
    }
    else{

      if(this.email != this.confirmEmail){
        this.error="Email Does not equals Confirm Email"
      }
      else{
        this.error="";

        this.service.sendEmail(this.email).subscribe(async data =>{
          this.realOtpCode = data.data.sendemail
          console.log(this.realOtpCode)
        })
  
  
        let hidden = document.getElementsByClassName('popup') as HTMLCollectionOf<HTMLElement>;
        hidden[0].style.display = "block";
      }
      
    }
  
  }

  register(){

    if(this.account == '' || this.password == '' || this.confirmPassword == '' || this.otpCode == ''){
      this.error2 = "Please Fill The Form Properly !";
    }else{

      if(this.password != this.confirmPassword){
        this.error2 = "Password not same as Confirm Password !";
      }
      else{
        // Validate OTP Code
        if(this.realOtpCode != this.otpCode){
          this.error2 = "Wrong OTP Code";
        }else{
          this.error2 = "";

          // REGISTERED HERE
          this.service.insertUser(this.account, this.password, this.email, this.country).subscribe(async data => {
            console.log(data)
          })

          this.router.navigate(['/login'])
        }
      }

    }


  }






}
