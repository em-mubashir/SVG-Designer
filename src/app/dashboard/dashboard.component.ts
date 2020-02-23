import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import interact from 'interactjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { TagContentType } from '@angular/compiler';
import { SvgUploadService } from '../svg-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private svgUploadService: SvgUploadService
  ) {

  }

  ngOnInit() {

    if (!this.loginService.loginId) {

      window.alert('You must login first!');
      this.router.navigate(['/']);

    } else {
      this.loadScreen();
      this.loadSvgsFromDatabase();

    }

  }

  globalScreenId;

  loadSvgsFromDatabase() {

    // window.alert('Loading Svgs....');

    this.svgUploadService.getSvgs().then((data: []) => {

      let ul = document.getElementById('svgsLibrary');

      // nav-link btn btn-sm btn-outline-light text-dark

      for (let i = 0; i < data.length; i++) {

        let button = this.renderer.createElement('span');

        this.renderer.setAttribute(button, 'style', 'margin:0px; padding:0px;');
        this.renderer.addClass(button, 'nav-link');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-sm');
        this.renderer.addClass(button, 'btn-outline-light');
        this.renderer.addClass(button, 'text-dark');
        button.innerHTML = data[i];

        if ((i + 1) / 2 == 0) {
          this.renderer.setAttribute(button, 'style', 'margin:0px; padding:0px;');
        } else {
          this.renderer.setAttribute(button, 'style', 'float:left; margin:0px; padding:0px;');
        }

        let text = button.innerHTML;
        let text1 = text.replace('width=', 'width="50px"');
        let text2 = text1.replace('height=', 'height="50px"');

        button.innerHTML = text2;
        // window.alert(text2);

        // button.innerHTML = text2;



        // this.renderer.appendChild(button, this.renderer.createText('SVG ' + (i + 1)));

        this.renderer.listen(button, 'click', (event) => {

          this.designCanvas.nativeElement.innerHTML += data[i];
          this.renderLoadedScreen();

        });

        this.renderer.appendChild(ul, button);

      }

      // console.log(data);
    });

  }

  tempFiles: any;
  svgs = [];

  onSelectFile(event) {
    this.tempFiles = event;

  }

  uploadDocumentToDatabase() {

    let svgsArray = [];

    if (this.tempFiles.target.files && this.tempFiles.target.files[0]) {
      var filesAmount = this.tempFiles.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // this.svgs.push(event.target.result);
          svgsArray.push(this.extractSvgForUpload(event.target.result.toString()));
        }

        reader.readAsText(this.tempFiles.target.files[i]);
      }
    }


    this.svgUploadService.postSvgs(svgsArray);
    this.loadSvgsFromDatabase();


  }






  @ViewChild('designCanvas', { static: false }) designCanvas: ElementRef;
  @ViewChild('propertyTable', { static: false }) propertyTable: ElementRef;



  url = 'https://designperfect-2a5f1.firebaseio.com/screens.json/';


  file: any;
  fileChanged(e) {
    this.file = e.target.files[0];
  }

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

  loadScreen() {

    let ul = document.getElementById('screenstoggle');
    ul.innerHTML = '';

    this.http.get(this.url).toPromise().then((data: any[]) => {


      let screen = [];
      let screenIds = [];
      let j = 0;
      let flag = 0;



      for (let i = 0; i < data.length; i++) {

        if (data[i].id == this.loginService.loginId) {

          screen[j] = data[i].screen;
          screenIds[j++] = data[i].screenId;
          flag = 1;

          // console.log(data[i].screenId);

        }

      }

      if (flag == 0) {
        window.alert('No Saved Screens!');
      } else {

        // window.alert('Loaded Screens: ' + screen);

        let ul = document.getElementById('screenstoggle');
        ul.innerHTML = '';

        for (let i = 0; i < screen.length; i++) {



          let button = this.renderer.createElement('button');
          this.renderer.addClass(button, 'nav-link');
          this.renderer.addClass(button, 'btn');
          this.renderer.addClass(button, 'btn-sm');
          this.renderer.addClass(button, 'btn-outline-light');
          this.renderer.addClass(button, 'text-dark');
          this.renderer.setAttribute(button, 'id', 'scrrenId_' + i);

          this.renderer.appendChild(button, this.renderer.createText('Screen ' + i));

          this.renderer.listen(button, 'click', (event) => {

            this.globalScreenId = screenIds[i];
            this.designCanvas.nativeElement.innerHTML = screen[i].toString();

            this.renderLoadedScreen();



          });

          this.renderer.appendChild(ul, button);


        }


      }


    });


  }

  updateScreen() {

    this.http.get(this.url).toPromise().then((data: any) => {


      for (let i = 0; i < data.length; i++) {

        if (data[i].id == this.loginService.loginId && data[i].screenId == this.globalScreenId) {


          data[i].screen = this.designCanvas.nativeElement.innerHTML;



        }
      }

      this.http.put(this.url, data).toPromise().then(data => {
        window.alert('Screen Updated Successfully!');
        this.loadScreen();
      });



    });



  }

  deleteScreen() {

    // window.alert('Delete clicked!' + this.globalScreenId);

    this.http.get(this.url).toPromise().then((data: any) => {


      for (let i = 0; i < data.length; i++) {

        if (data[i].id == this.loginService.loginId && data[i].screenId == this.globalScreenId) {



          data.splice(i, 1);

          console.log(data);



        }
      }

      this.http.put(this.url, data).toPromise().then(data => {

        window.alert('Screen Deleted Successfully!');

        this.loadScreen();
      });



    });



  }

  renderLoadedScreen() {

    let children = this.designCanvas.nativeElement.children;

    for (let i = 0; i < children.length; i++) {



      let child = children[i];



      if (child.getAttribute('id').includes('shape') == false) {

        this.renderer.setAttribute(child, 'id', this.svgId);
        this.svgId++;

        this.getAllAttributes(child.getAttribute('id'));

      } else {



        let el1 = child.children[0];

        this.renderer.listen(child, 'click', (event) => {

          this.selectedId = el1.getAttribute('id');
          this.displayRectangleProperties(this.getRectangleProperties(el1.getAttribute('id')));


        });


        this.renderer.listen(el1, 'click', (event) => {

          this.selectedId = el1.getAttribute('id');
          this.displayRectangleProperties(this.getRectangleProperties(el1.getAttribute('id')));


        });



      }
    }
  }


  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      let svgText = fileReader.result.toString();
      // document.getElementById('svgUploaded').innerHTML = svgText;
      this.extractSvg(svgText);
    }
    fileReader.readAsText(this.file);
  }

  extractSvgForUpload(text: string) {

    let svgStartIndex = text.indexOf('<svg');

    let newText = text.slice(svgStartIndex, svgStartIndex + 5) + 'id="' + this.svgId + '" ' + text.slice(svgStartIndex + 5);
    svgStartIndex = newText.indexOf('<svg');
    let newText1 = newText.slice(svgStartIndex, svgStartIndex + 5) + 'class="resize-drag" ' + newText.slice(svgStartIndex + 5);


    return newText1;

  }

  extractSvg(text: string) {

    let svgStartIndex = text.indexOf('<svg');


    let newText = text.slice(svgStartIndex, svgStartIndex + 5) + 'id="' + this.svgId + '" ' + text.slice(svgStartIndex + 5);
    svgStartIndex = newText.indexOf('<svg');
    let newText1 = newText.slice(svgStartIndex, svgStartIndex + 5) + 'class="resize-drag" ' + newText.slice(svgStartIndex + 5);

    // alert(newText1);
    console.log(newText1);
    document.getElementById('designCanvas').innerHTML = document.getElementById('designCanvas').innerHTML + newText1;


    this.selectedId = this.svgId;
    this.svgId++;
    this.getAllAttributes(this.selectedId);



  }

  svgId: any = 0;
  pathId: any = 0;

  selectedId: any;

  makePathsClickable() {
    let paths = this.elRef.nativeElement.querySelectorAll('path');

    [].forEach.call(paths, (e) => {
      this.renderer.listen(e, 'click', (event) => {

        if (!e.getAttribute('id')) {
          e.setAttribute('id', 'path_' + this.pathId);
          this.selectedId = this.pathId;

          this.pathId++;
        }

        this.resetPropertyTable();
        this.displayProperties(this.getAllAttributes(e.getAttribute('id')));

      })
    });

  }





  factory() {



    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '2.0104in');
    this.renderer.setAttribute(svg, 'height', '1.4423in');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 998 716');
    this.renderer.setAttribute(svg, 'class', 'resize-drag');

    this.renderer.setAttribute(svg, 'id', this.svgId);
    this.svgId++;


    let path1 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path1, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path1, 'd', 'M331,520 l17,-303 33,0 17,303 -67,0z');



    let path2 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path2, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path2, 'd', 'M247,520 l17,-303 33,0 17,303 -67,0z');


    let path3 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path3, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path3, 'd', 'M162,520 l17,-303 34,0 17,303 -68,0z');



    let path4 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path4, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path4, 'd', 'M339,520 l13,-299 25,0 13,299 -51,0z');



    let path5 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path5, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path5, 'd', 'M255,520 l13,-299 25,0 13,299 -51,0z');




    let path6 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path6, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path6, 'd', 'M171,520 l12,-299 26,0 12,299 -50,0z');




    let path7 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path7, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path7, 'd', 'M356,520 l4,-299 9,0 4,299 -17,0z');



    let path8 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path8, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path8, 'd', 'M272,520 l4,-299 8,0 5,299 -17,0z');



    let path9 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path9, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path9, 'd', 'M187,520 l5,-299 8,0 4,299 -17,0z');



    let path10 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path10, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path10, 'd', 'M259,217 l0,-9 42,0 0,9 -42,0z');


    let path11 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path11, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path11, 'd', 'M343,217 l0,-9 42,0 0,9 -42,0z');



    let path12 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path12, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path12, 'd', 'M175,217 l0,-9 42,0 0,9 -42,0z');




    let path13 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path13, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path13, 'd', 'M95,671 l875,0 0,-219 -875,0 0,219z');



    let path14 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path14, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path14, 'd', 'M28,520 l606,0 0,168 -606,0 0,-168z');



    let path15 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path15, 'style', 'fill:#333;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path15, 'd', 'M465,621 l34,0 0,67 -34,0 0,-67z');



    let path16 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path16, 'style', 'fill:#b2b2b2;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path16, 'd', 'M634,629 l315,0 0,-21 -315,0 0,21z');



    let path17 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path17, 'style', 'fill:#000;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path17, 'd', 'M634,595 l315,0 0,13 -315,0 0,-13z');



    let path18 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path18, 'style', 'fill:#000;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path18, 'd', 'M40,536 l581,0 0,13 -581,0 0,-13z');



    let path19 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path19, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path19, 'd', 'M40,549 l65,0 0,21 -65,0 0,-21z');



    let path20 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path20, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path20, 'd', 'M105,549 l64,0 0,21 -64,0 0,-21z');



    let path21 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path21, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path21, 'd', 'M169,549 l65,0 0,21 -65,0 0,-21z');


    let path22 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path22, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path22, 'd', 'M234,549 l64,0 0,21 -64,0 0,-21z');



    let path23 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path23, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path23, 'd', 'M298,549 l65,0 0,21 -65,0 0,-21z');



    let path24 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path24, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path24, 'd', 'M363,549 l65,0 0,21 -65,0 0,-21z');



    let path25 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path25, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path25, 'd', 'M428,549 l64,0 0,21 -64,0 0,-21z');



    let path26 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path26, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path26, 'd', 'M492,549 l65,0 0,21 -65,0 0,-21z');



    let path27 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path27, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path27, 'd', 'M557,549 l64,0 0,21 -64,0 0,-21z');



    let path28 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path28, 'style', 'fill:#e5e5e5;stroke:#7f7f7f;stroke-width:2');
    this.renderer.setAttribute(path28, 'd', 'M377,195 l12,-28 9,-22 29,-7 28,-8 15,-6 28,2 30,0 26,-6 26,-7 19,-17 5,-10 30,-2 19,-8 3,-4 0,-2 -1,-3 -31,-7 -29,-1 -28,-2 -4,-5 -2,-14 -1,-1 -2,0 -2,1 -28,-3 -27,3 -28,2 -32,-2 -29,1 -25,7 -24,8 -26,-7 -23,-15 -27,-3 -7,-1 -6,0 -6,0 -27,13 -18,26 -14,15 -2,0 -7,-1 -4,2 -14,25 3,29 -4,17 -1,3 0,4 8,32 0,2 1,1 2,1 2,0 1,0 8,-1 9,-25 8,-18 -2,-7 12,-23 7,-4 2,0 24,23 9,22 -3,32 25,-2 6,-26 20,-23 9,-17 3,-1 3,-1 18,13 -1,30 5,26 21,0z');


    let path29 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path29, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path29, 'd', 'M373,191 l11,-28 10,-22 5,2 24,-17 4,-6 30,-1 28,1 29,-4 32,-8 14,-7 3,-11 3,-4 28,-1 18,-6 2,-3 0,-3 -1,-2 -1,-1 -32,-4 -30,5 -20,2 -1,-1 -3,-5 -29,-14 -26,-5 -26,8 -29,1 -28,-3 -30,6 -27,6 -5,-1 -11,1 -15,-21 -4,-1 -6,1 -16,6 -26,3 -23,19 -15,14 -7,0 -3,1 -13,21 2,27 -3,12 0,3 0,3 6,26 1,2 0,1 1,1 10,-1 8,-25 1,-16 15,-23 21,-17 5,2 1,2 0,1 -5,8 -1,6 21,23 4,7 2,6 -3,27 16,3 1,-1 6,-27 1,-6 17,-24 4,-9 25,1 4,1 9,13 0,32 4,21 11,3 2,0z');



    this.renderer.appendChild(svg, path1);
    this.renderer.appendChild(svg, path2);
    this.renderer.appendChild(svg, path3);
    this.renderer.appendChild(svg, path4);
    this.renderer.appendChild(svg, path5);
    this.renderer.appendChild(svg, path6);
    this.renderer.appendChild(svg, path7);
    this.renderer.appendChild(svg, path8);
    this.renderer.appendChild(svg, path9);
    this.renderer.appendChild(svg, path10);
    this.renderer.appendChild(svg, path11);
    this.renderer.appendChild(svg, path12);
    this.renderer.appendChild(svg, path13);
    this.renderer.appendChild(svg, path14);
    this.renderer.appendChild(svg, path15);
    this.renderer.appendChild(svg, path16);
    this.renderer.appendChild(svg, path17);
    this.renderer.appendChild(svg, path18);
    this.renderer.appendChild(svg, path19);
    this.renderer.appendChild(svg, path20);
    this.renderer.appendChild(svg, path21);
    this.renderer.appendChild(svg, path22);
    this.renderer.appendChild(svg, path23);
    this.renderer.appendChild(svg, path24);
    this.renderer.appendChild(svg, path25);
    this.renderer.appendChild(svg, path26);
    this.renderer.appendChild(svg, path27);
    this.renderer.appendChild(svg, path28);
    this.renderer.appendChild(svg, path29);


    this.renderer.appendChild(this.designCanvas.nativeElement, svg);

    this.getAllAttributes(svg.getAttribute('id'));

    // this.makePathsClickable();

  }


  reset() {
    this.renderer.setProperty(this.designCanvas.nativeElement, 'innerHTML', '');
    this.resetPropertyTable();

  }

  resetPropertyTable() {

    this.renderer.setProperty(this.propertyTable.nativeElement, 'innerHTML', '');

    let thead = this.renderer.createElement('thead');

    let tr = this.renderer.createElement('tr');

    let td = this.renderer.createElement('td');
    let text = this.renderer.createText('Property');
    this.renderer.appendChild(td, text);

    let td1 = this.renderer.createElement('td');
    let text1 = this.renderer.createText('Value');
    this.renderer.appendChild(td1, text1);

    this.renderer.appendChild(tr, td);
    this.renderer.appendChild(tr, td1);

    this.renderer.appendChild(thead, tr)
    this.renderer.appendChild(this.propertyTable.nativeElement, thead);


  }



  // Function is in JS
  getAllAttributes(id: string) {


    let el = document.getElementById(id);
    let arr = [];

    this.renderer.listen(el, 'dblclick', (event) => {
      // alert('Double click works!');
      this.resetPropertyTable();
      this.selectedId = el.getAttribute('id');

      // alert('Parent SVG selected!');
      // this.displayProperties(this.selectedId);
    });

    for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {

      // if (i != 0) {
      arr.push(atts[i].nodeName);
      arr.push(atts[i].nodeValue);
      //}
    }

    let children = el.children;

    for (let j = 0; j < children.length; j++) {

      let childNode = children[j];

      // alert(childNode);

      // make path clickable and add id

      this.renderer.setAttribute(childNode, 'id', 'path_' + this.pathId++);
      this.renderer.listen(childNode, 'click', (event) => {

        this.selectedId = childNode.getAttribute('id');

        this.resetPropertyTable();
        this.displayProperties(this.getAllAttributes(childNode.getAttribute('id')));

      });

      // end

      for (let k = 0, atts = childNode.attributes; k < atts.length; k++) {
        // if (k != 0) {
        arr.push(atts[k].nodeName);
        arr.push(atts[k].nodeValue);
        // }
      }

    }
    // alert(arr);
    return arr;


  }

  displayProperties(properties: any) {


    let tbody = this.renderer.createElement('tbody');

    // Start - For SVG Color change - all paths color will be changed

    let tr = this.renderer.createElement('tr');

    let td = this.renderer.createElement('td');
    let tdText = this.renderer.createText("Color");
    this.renderer.appendChild(td, tdText);

    let td1 = this.renderer.createElement('td');

    let input = this.renderer.createElement('input');
    input.setAttribute('type', 'color');
    input.setAttribute('value', document.getElementById(this.selectedId).getAttribute('style').slice(
      document.getElementById(this.selectedId).getAttribute('style').indexOf('fill:') + 5,
      document.getElementById(this.selectedId).getAttribute('style').indexOf('fill:') + 12
    ));
    this.renderer.listen(input, 'change', (event) => {

      let path = document.getElementById(this.selectedId);

      path.setAttribute('style', path.getAttribute('style').replace(/fill:/g, 'fill:' + input.value + ';'));


    });

    this.renderer.appendChild(td1, input);

    this.renderer.appendChild(tr, td);
    this.renderer.appendChild(tr, td1);

    this.renderer.appendChild(tbody, tr);

    {
      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Z-index');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        let children = document.getElementById(this.selectedId).parentElement;
        children.setAttribute('style', children.getAttribute('style') + ';position:relative; z-index: ' + input.value + ';');

      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);
    }

    // Read from LabelId
    var labelId;

    {
      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Label');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        labelId = input.value;
        alert('LabelId: ' + labelId + ' and actual id: ' + input.value);

      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);
    }

    // Condition
    var condition;

    {
      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Condition on Value: ');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        condition = input.value;


      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);
    }

    // Color change
    var colorToChange;

    {
      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Color to change: ');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('Condition:', '');



      this.renderer.listen(input, 'change', (event) => {

        colorToChange = input.value;

      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);
    }

    // Add multiple conditions
    let conditionsArray = [];
    let j = 0;
    {

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let button = this.renderer.createElement('button');
      this.renderer.setAttribute(button, 'colspan', '2');
      this.renderer.appendChild(button, this.renderer.createText('Add Condition'));

      this.renderer.listen(button, 'click', (event) => {

        let tr = this.renderer.createElement('tr');

        let td = this.renderer.createElement('td');
        let tdText = this.renderer.createText('Condition on Value: ');
        this.renderer.appendChild(td, tdText);

        let td1 = this.renderer.createElement('td');

        let input = this.renderer.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', '');

        this.renderer.listen(input, 'change', (event) => {

          conditionsArray[j++] = input.value;

        });

        this.renderer.appendChild(td1, input);

        this.renderer.appendChild(tr, td);
        this.renderer.appendChild(tr, td1);

        // Add another row

        let tr1 = this.renderer.createElement('tr');

        let td2 = this.renderer.createElement('td');
        let tdText2 = this.renderer.createText('Color to Change:');
        this.renderer.appendChild(td2, tdText2);

        let td3 = this.renderer.createElement('td');

        let input3 = this.renderer.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', '');

        this.renderer.listen(input3, 'change', (event) => {

          conditionsArray[j++] = input3.value;


        });

        this.renderer.appendChild(td3, input3);

        this.renderer.appendChild(tr1, td2);
        this.renderer.appendChild(tr1, td3);

        this.renderer.appendChild(tbody, tr);
        this.renderer.appendChild(tbody, tr1);


      });

      this.renderer.appendChild(td, button);
      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tbody, tr);

    }

    {

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let button = this.renderer.createElement('button');

      this.renderer.setAttribute(button, 'colspan', '2');
      this.renderer.appendChild(button, this.renderer.createText('Apply'));

      this.renderer.listen(button, 'click', (event) => {

        alert(conditionsArray);

        if (j == 0) {

          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.innerHTML = 'var myVar = setInterval(detectAndChangeColor, 500); function detectAndChangeColor(){var labelInt = parseInt(document.getElementById("' + labelId + '").innerHTML); if(labelInt ' + condition + '){var path = document.getElementById("' + this.selectedId + '");path.setAttribute("style", path.getAttribute("style").replace(/fill:/g, "fill:' + colorToChange + ';"));}else{var path = document.getElementById("' + this.selectedId + '");path.setAttribute("style", path.getAttribute("style").replace(/fill:/g, "fill:white;"));}}';
          head.appendChild(script);

        } else {


          let text0 = 'var myVar = setInterval(detectAndChangeColor, 500); function detectAndChangeColor(){var labelInt = parseInt(document.getElementById("' + labelId +'").innerHTML);if(labelInt ' + condition + '){var path = document.getElementById("' + this.selectedId + '");path.setAttribute("style", path.getAttribute("style").replace(/fill:/g, "fill:' + colorToChange + ';"));}';
          let text1 = '';

          for(let i = 0; i < j; i+=2){

            text1 += 'if(labelInt ' + conditionsArray[i] + '){var path = document.getElementById("' + this.selectedId + '");path.setAttribute("style",path.getAttribute("style").replace(/fill:/g, "fill:' + conditionsArray[i+1] + ';"));}';

          }

          let finalText = text0 + text1 + '}';

          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.innerHTML = finalText;
          head.appendChild(script);
          

        }



      })

      this.renderer.appendChild(td, button);
      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tbody, tr);

    }



    this.renderer.appendChild(this.propertyTable.nativeElement, tbody);

  }

  rectangle() {


    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '400');
    this.renderer.setAttribute(svg, 'height', '100');
    this.renderer.setAttribute(svg, 'class', 'resize-drag-rectangle');
    this.renderer.setAttribute(svg, 'id', 'shape' + this.svgId);
    this.svgId++;



    let rect = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(rect, 'width', '400');
    this.renderer.setAttribute(rect, 'height', '100');
    this.renderer.setAttribute(rect, 'style', 'fill:white;stroke-width:5;stroke:rgb(0,0,0)');
    this.renderer.setAttribute(rect, 'id', 'rect' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;

    this.renderer.listen(rect, 'click', (event) => {

      this.selectedId = rect.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(rect.getAttribute('id')));


    });

    this.renderer.listen(svg, 'click', (event) => {

      this.selectedId = rect.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(rect.getAttribute('id')));


    });

    this.renderer.appendChild(svg, rect);



    this.renderer.appendChild(this.designCanvas.nativeElement, svg);

  }

  getRectangleProperties(id) {



    let arr = [];
    let el = document.getElementById(id);

    this.selectedId = id;




    for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {

      arr.push(atts[i].nodeName);
      arr.push(atts[i].nodeValue);
    }

    return arr;

  }

  displayRectangleProperties(properties: any) {

    // alert(properties);

    this.resetPropertyTable();

    let tbody = this.renderer.createElement('tbody');

    if (this.selectedId.includes('text')) {

      // Text Change

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Text');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        let children = document.getElementById(this.selectedId);
        children.innerHTML = input.value;

      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);

      // Font Size




      // alert('Text Detected!');
    }

    if (this.selectedId.includes('text')) {

      // Text Change

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('Font Size: ');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        let children = document.getElementById(this.selectedId);
        children.setAttribute('style', 'font-size:' + input.value + 'px');
      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);

      // Font Size




      // alert('Text Detected!');
    }

    if (this.selectedId.includes('text')) {

      // Add OPC Tag

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText('OPC Tag: ');
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', '');



      this.renderer.listen(input, 'change', (event) => {

        let children = document.getElementById(this.selectedId);
        children.setAttribute('opc-tag-txt', '{"tag":"' + input.value + '","config":{"formats":{"bad_q":"?????"}}}');

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = './assets/js/opc-lib-min.js';
        head.appendChild(script);

        // alert(this.designCanvas.nativeElement.innerHTML.toString());


        // this.designCanvas.nativeElement.innerHTML = this.designCanvas.nativeElement.innerHTML.toString().replace("}}}\"", "}}}'");


      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);

      // Font Size

      // alert('Text Detected!');
    }

    // z-index

    let tr = this.renderer.createElement('tr');

    let td = this.renderer.createElement('td');
    let tdText = this.renderer.createText('Z-index');
    this.renderer.appendChild(td, tdText);

    let td1 = this.renderer.createElement('td');

    let input = this.renderer.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', '');



    this.renderer.listen(input, 'change', (event) => {

      let children = document.getElementById(this.selectedId).parentElement;
      children.setAttribute('style', children.getAttribute('style') + ';position:relative; z-index: ' + input.value + ';');

    });

    this.renderer.appendChild(td1, input);

    this.renderer.appendChild(tr, td);
    this.renderer.appendChild(tr, td1);

    this.renderer.appendChild(tbody, tr);


    for (let i = 0; i < (properties.length); i += 2) {

      let tr = this.renderer.createElement('tr');

      let td = this.renderer.createElement('td');
      let tdText = this.renderer.createText(properties[i]);
      this.renderer.appendChild(td, tdText);

      let td1 = this.renderer.createElement('td');

      let input = this.renderer.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', properties[i + 1]);



      this.renderer.listen(input, 'change', (event) => {

        let children = document.getElementById(this.selectedId);
        children.setAttribute(properties[i], input.value);

        // alert('Click Event');


      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);

    }



    this.renderer.appendChild(this.propertyTable.nativeElement, tbody);

  }

  square() {
    // <rect width="400" height="100" style="fill:rgb(0,0,255);stroke-width:10;stroke:rgb(0,0,0)" />

    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '100');
    this.renderer.setAttribute(svg, 'height', '100');
    this.renderer.setAttribute(svg, 'class', 'resize-drag-rectangle');
    this.renderer.setAttribute(svg, 'id', 'shape' + this.svgId);
    this.svgId++;


    let rect = this.renderer.createElement('rect', 'svg');
    this.renderer.setAttribute(rect, 'width', '100');
    this.renderer.setAttribute(rect, 'height', '100');
    this.renderer.setAttribute(rect, 'style', 'fill:white;stroke-width:5;stroke:rgb(0,0,0)');
    this.renderer.setAttribute(rect, 'id', 'rect' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;


    this.renderer.listen(rect, 'click', (event) => {

      this.selectedId = rect.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(rect.getAttribute('id')));


    });

    this.renderer.listen(svg, 'click', (event) => {

      this.selectedId = rect.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(rect.getAttribute('id')));


    });



    this.renderer.appendChild(svg, rect);

    this.renderer.appendChild(this.designCanvas.nativeElement, svg);

  }

  circle() {

    //  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />

    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '100');
    this.renderer.setAttribute(svg, 'height', '100');
    this.renderer.setAttribute(svg, 'class', 'resize-drag-circle');
    this.renderer.setAttribute(svg, 'id', 'shape' + this.svgId);
    this.svgId++;

    let circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', '50%');
    this.renderer.setAttribute(circle, 'cy', '50%');
    this.renderer.setAttribute(circle, 'r', '40');
    this.renderer.setAttribute(circle, 'stroke', 'black');
    this.renderer.setAttribute(circle, 'stroke-width', '4');
    this.renderer.setAttribute(circle, 'fill', 'white');
    this.renderer.setAttribute(circle, 'id', 'rect' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;


    this.renderer.listen(circle, 'click', (event) => {

      this.selectedId = circle.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(circle.getAttribute('id')));


    });

    this.renderer.listen(svg, 'click', (event) => {

      this.selectedId = circle.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(circle.getAttribute('id')));


    });


    this.renderer.appendChild(svg, circle);

    this.renderer.appendChild(this.designCanvas.nativeElement, svg);


  }

  line() {

    //     <svg height="210" width="500">
    //   <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
    // </svg>

    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '100');
    this.renderer.setAttribute(svg, 'height', '100');
    this.renderer.setAttribute(svg, 'class', 'resize-drag');
    this.renderer.setAttribute(svg, 'id', 'shape' + this.svgId);
    this.svgId++;

    let line = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line, 'x1', '0%');
    this.renderer.setAttribute(line, 'y1', '0%');
    this.renderer.setAttribute(line, 'x2', '100%');
    this.renderer.setAttribute(line, 'y2', '100%');
    this.renderer.setAttribute(line, 'style', 'stroke:rgb(255,0,0);stroke-width:2');
    this.renderer.setAttribute(line, 'id', 'rect' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;


    this.renderer.listen(line, 'click', (event) => {

      this.selectedId = line.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(line.getAttribute('id')));


    });

    this.renderer.listen(svg, 'click', (event) => {

      this.selectedId = line.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(line.getAttribute('id')));


    });


    this.renderer.appendChild(svg, line);

    this.renderer.appendChild(this.designCanvas.nativeElement, svg);



  }

  text() {

    //     <svg height="30" width="200">
    //   <text x="0" y="15" fill="red">I love SVG!</text>
    // </svg>
    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '200');
    this.renderer.setAttribute(svg, 'height', '40');
    this.renderer.setAttribute(svg, 'class', 'resize-drag-text');
    this.renderer.setAttribute(svg, 'id', 'shape' + this.svgId);
    this.svgId++;

    let text = this.renderer.createElement('text', 'svg');
    this.renderer.setAttribute(text, 'x', '0%');
    this.renderer.setAttribute(text, 'y', '50%');

    this.renderer.appendChild(text, this.renderer.createText('I love SVG'));

    this.renderer.setAttribute(text, 'id', 'text' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;


    this.renderer.listen(text, 'click', (event) => {

      this.selectedId = text.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(text.getAttribute('id')));


    });

    this.renderer.listen(svg, 'click', (event) => {

      this.selectedId = text.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(text.getAttribute('id')));


    });

    this.renderer.appendChild(svg, text);

    this.renderer.appendChild(this.designCanvas.nativeElement, svg);
  }

  label() {

    let text = this.renderer.createElement('label');
    this.renderer.setAttribute(text, 'x', '0%');
    this.renderer.setAttribute(text, 'y', '50%');
    this.renderer.setAttribute(text, 'class', 'resize-drag-label');

    this.renderer.appendChild(text, this.renderer.createText('I love SVG'));

    this.renderer.setAttribute(text, 'id', 'text' + this.svgId);
    this.selectedId = this.svgId;
    this.svgId++;


    this.renderer.listen(text, 'click', (event) => {

      this.selectedId = text.getAttribute('id');
      this.displayRectangleProperties(this.getRectangleProperties(text.getAttribute('id')));


    });


    this.renderer.appendChild(this.designCanvas.nativeElement, text);

  }

}


//dragable - start

interact('.resize-drag')
  .draggable({
    onmove: dragMoveListener,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
        endOnly: true
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 100 }
      })
    ],

    // inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

function dragMoveListener(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

}


//dragable - start - rectangle

interact('.resize-drag-rectangle')
  .draggable({
    onmove: dragMoveListenerRectangle,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
        endOnly: true
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    // inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    target.childNodes[0].style.width = event.rect.width + 'px'
    target.childNodes[0].style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    // target.childNodes[0].style.webkitTransform = target.childNodes[0].style.transform =
    // 'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

function dragMoveListenerRectangle(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'
  // target.childNodes[0].style.webkitTransform =
  // target.childNodes[0].style.transform =
  // 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // target.childNodes[0].setAttribute('data-x', x)
  // target.childNodes[0].setAttribute('data-y', y)


}

//dragable - start - circle

interact('.resize-drag-circle')
  .draggable({
    onmove: dragMoveListenerCircle,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
        endOnly: true
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    // inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'


    //
    target.childNodes[0].style.r = event.rect.width / 2;
    target.childNodes[0].style.r = event.rect.height / 2;


    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    // target.childNodes[0].style.webkitTransform = target.childNodes[0].style.transform =
    // 'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

function dragMoveListenerCircle(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'
  // target.childNodes[0].style.webkitTransform =
  // target.childNodes[0].style.transform =
  // 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // target.childNodes[0].setAttribute('data-x', x)
  // target.childNodes[0].setAttribute('data-y', y)


}

//dragable - start - text

interact('.resize-drag-text')
  .draggable({
    onmove: dragMoveListenerText,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, top: true, bottom: true },

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
        endOnly: true
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 200, height: 40 }
      })
    ],

    // inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    target.childNodes[0].style.width = event.rect.width + 'px'
    target.childNodes[0].style.height = event.rect.height + 'px'


    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

function dragMoveListenerText(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

}

//dragable - start - label

interact('.resize-drag-label')
  .draggable({
    onmove: dragMoveListenerLabel,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: {},

    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent',
        endOnly: true
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 200, height: 40 }
      })
    ],

    // inertia: true
  })
  .on('resizemove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    // target.style.width = event.rect.width + 'px'
    // target.style.height = event.rect.height + 'px'

    // target.childNodes[0].style.width = event.rect.width + 'px'
    // target.childNodes[0].style.height = event.rect.height + 'px'


    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
  })

function dragMoveListenerLabel(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

}
