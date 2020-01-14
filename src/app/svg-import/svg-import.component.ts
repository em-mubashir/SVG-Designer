import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-svg-import',
  templateUrl: './svg-import.component.html',
  styleUrls: ['./svg-import.component.scss']
})
export class SvgImportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  file: any;
  fileChanged(e) {
    this.file = e.target.files[0];
  }


  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      let svgText = fileReader.result.toString();
      document.getElementById('svgUploaded').innerHTML = svgText;
      this.extractSvg(svgText);
    }
    fileReader.readAsText(this.file);
  }

  extractSvg(text : string){

    let svgStartIndex = text.indexOf('<svg');
    
    let newText = text.slice(svgStartIndex, svgStartIndex + 5) + 'id="randomId" ' + text.slice(svgStartIndex + 5); 
    alert(newText); 
    

  }

}