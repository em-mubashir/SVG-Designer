import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../src/app/login.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private http: HttpClient,private loginService: LoginService) {
    
   }
   url = 'https://designperfect-2a5f1.firebaseio.com/screens.json/';
  saveScreen() {

    this.http.get(this.url).toPromise().then((data: any[]) => {

      let screenIdTemp;

      let newData = [];

      if (data == null) {

        screenIdTemp = 0;

        newData.push({

          screenId: screenIdTemp,
          id: this.loginService.loginId,
          screen: this.designCanvas.nativeElement.innerHTML

        });



      } else {

        screenIdTemp = (data[(data.length - 1)].screenId + 1);

        newData = newData.concat(data);

        newData.push({

          screenId: screenIdTemp,
          id: this.loginService.loginId,
          screen: this.designCanvas.nativeElement.innerHTML

        });

      }

      this.http.put(this.url, newData).toPromise().then(data => {
        window.alert('Screen Saved Successfully!');
        this.loadScreen();
      });



    });

  }
}
