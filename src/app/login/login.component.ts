import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form } from '@angular/forms';
import { LoginService } from '../login.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {

    this.loginForm = formBuilder.group({

      email: '',
      password: ''

    });

  }

  onSubmit(loginData) {

   

    console.warn('Your order has been submitted', loginData);
    // this.loginForm = loginData;

    this.loginService.getLoginData().then((data: any) => {
      
      let flag = 0;

      for(let i = 0; i < data.length; i ++){

        if(loginData.email == data[i].email && loginData.password == data[i].password){
          // alert('Correct Info! Login ID: ' + data[i].id);

          this.loginService.setLoginId(data[i].id);
          this.router.navigate(['/dashboard/']);

          
          flag = 1;

        }

      }

      if(flag == 0){
        alert('Incorrect credentials! Please Try Again!');
      }

      
    });

    

  }

  ngOnInit() {



  }

}
