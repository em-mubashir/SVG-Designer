import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SvgUploadService {

  constructor(
    private http: HttpClient
  ) { }


  url = 'https://designperfect-2a5f1.firebaseio.com/svg.json/';

  getSvgs() {

    return this.http.get(this.url).toPromise();

  }


  postSvgs(svg: any) {

    let newData;

    this.http.get(this.url).toPromise().then((data: []) => {



      if (data == null) {

        data = [];
        newData = data.concat(svg);

      } else {


        newData = data.concat(svg);



      }



      this.http.put(this.url, newData).toPromise().then(data =>
        window.alert('All SVGs Saved Successfully!')
      );



    });

  }

}
