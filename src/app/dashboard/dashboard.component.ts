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
        this.renderer.setProperty(this.designCanvas.nativeElement, 'innerHTML', '');
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

      alert('Parent SVG selected!');
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

    if (true) {
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
