import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-svg-import',
  templateUrl: './svg-import.component.html',
  styleUrls: ['./svg-import.component.scss']
})
export class SvgImportComponent implements OnInit {


  postData = {

    name: 'Factory',
    content: '<svg ..........................> </svg>'

  }

  url = 'https://svgdesigntool.firebaseio.com/db.json';

  constructor(private http: HttpClient) { 
  
  }

  ngOnInit() {
  }

  testFunction(){

  }
 
 

}