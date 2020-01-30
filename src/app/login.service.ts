import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  loginId;

  getLoginData() {

    return this.http.get('https://designperfect-2a5f1.firebaseio.com/users.json').toPromise();

  }

  postLoginData(enteredEmail, enteredPassword) {

    let data = {
      email: enteredEmail,
      password: enteredPassword
    }

    this.http.put('https://designperfect-2a5f1.firebaseio.com/users.json', data).toPromise().then(data =>
      alert('Success! User entered!')
    );

  }

  setLoginId(id){
    this.loginId = id;
  }

  getLoginId(){
    return this.loginId;
  }

}
