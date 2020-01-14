import { Component, OnInit } from '@angular/core';

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
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
}

  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}
