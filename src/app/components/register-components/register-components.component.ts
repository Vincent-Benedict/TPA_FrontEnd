import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'register-components',
  templateUrl: './register-components.component.html',
  styleUrls: ['./register-components.component.scss']
})
export class RegisterComponentsComponent implements OnInit {

  aFormGroup: FormGroup;

  siteKey:string = '';
  theme: string = '';

  constructor(private formBuilder: FormBuilder) { 
    this.siteKey = '6Ldh7DUaAAAAAIoLgQvsIvRCW7O0oJVvKtalY_pI';
    this.theme = 'Dark';
  }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

  }

}
