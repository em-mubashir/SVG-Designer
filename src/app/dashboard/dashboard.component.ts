import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import interact from 'interactjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  svgId: any = 0;
  pathId: any = 0;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {



  }

  @ViewChild('designCanvas', { static: false }) designCanvas: ElementRef;
  @ViewChild('propertyTable', { static: false }) propertyTable: ElementRef;


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

  // for transcluded content
  ngAfterViewInit() {

    // this.makePathsClickable();

  }

  ngOnInit() { }

  factory() {



    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '2.0104in');
    this.renderer.setAttribute(svg, 'height', '1.4423in');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 998 716');
    this.renderer.setAttribute(svg, 'style', 'background-color: white;');
    this.renderer.setAttribute(svg, 'class', 'resize-drag');


    this.renderer.setAttribute(svg, 'id', this.svgId);
    this.svgId++;

    this.renderer.listen(svg, 'dblclick', (event) => {

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(svg.getAttribute('id')));

      this.selectedId = svg.getAttribute('id');
      this.renderer.setAttribute(svg, 'style', svg.getAttribute('style') + 'z-index: 0;');

    });



    let path1 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path1, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path1, 'd', 'M331,520 l17,-303 33,0 17,303 -67,0z');
    this.renderer.setAttribute(path1, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path1, 'click', (event) => {

      this.selectedId = path1.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path1.getAttribute('id')));
      

    });


    let path2 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path2, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path2, 'd', 'M247,520 l17,-303 33,0 17,303 -67,0z');
    this.renderer.setAttribute(path2, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path2, 'click', (event) => {

      this.selectedId = path2.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path2.getAttribute('id')));
      

    });

    let path3 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path3, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path3, 'd', 'M162,520 l17,-303 34,0 17,303 -68,0z');
    this.renderer.setAttribute(path3, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path3, 'click', (event) => {

      this.selectedId = path3.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path3.getAttribute('id')));
      

    });



    let path4 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path4, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path4, 'd', 'M339,520 l13,-299 25,0 13,299 -51,0z');
    this.renderer.setAttribute(path4, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path4, 'click', (event) => {

      this.selectedId = path4.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path4.getAttribute('id')));
     

    });


    let path5 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path5, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path5, 'd', 'M255,520 l13,-299 25,0 13,299 -51,0z');
    this.renderer.setAttribute(path5, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path5, 'click', (event) => {

      this.selectedId = path5.getAttribute('id');
     
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path5.getAttribute('id')));
      

    });



    let path6 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path6, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path6, 'd', 'M171,520 l12,-299 26,0 12,299 -50,0z');
    this.renderer.setAttribute(path6, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path6, 'click', (event) => {

      this.selectedId = path6.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path6.getAttribute('id')));
      

    });



    let path7 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path7, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path7, 'd', 'M356,520 l4,-299 9,0 4,299 -17,0z');
    this.renderer.setAttribute(path7, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path7, 'click', (event) => {

      this.selectedId = path7.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path7.getAttribute('id')));
      

    });


    let path8 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path8, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path8, 'd', 'M272,520 l4,-299 8,0 5,299 -17,0z');
    this.renderer.setAttribute(path8, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path8, 'click', (event) => {

      this.selectedId = path8.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path8.getAttribute('id')));
      

    });


    let path9 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path9, 'style', 'fill:#ccc');
    this.renderer.setAttribute(path9, 'd', 'M187,520 l5,-299 8,0 4,299 -17,0z');
    this.renderer.setAttribute(path9, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path9, 'click', (event) => {

      this.selectedId = path9.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path9.getAttribute('id')));
      

    });


    let path10 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path10, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path10, 'd', 'M259,217 l0,-9 42,0 0,9 -42,0z');
    this.renderer.setAttribute(path10, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path10, 'click', (event) => {

      this.selectedId = path10.getAttribute('id');
     
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path10.getAttribute('id')));
      

    });


    let path11 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path11, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path11, 'd', 'M343,217 l0,-9 42,0 0,9 -42,0z');
    this.renderer.setAttribute(path11, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path11, 'click', (event) => {

      this.selectedId = path11.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path11.getAttribute('id')));
      

    });


    let path12 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path12, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path12, 'd', 'M175,217 l0,-9 42,0 0,9 -42,0z');
    this.renderer.setAttribute(path12, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path12, 'click', (event) => {

      this.selectedId = path12.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path12.getAttribute('id')));
      

    });


    let path13 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path13, 'style', 'fill:#666;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path13, 'd', 'M95,671 l875,0 0,-219 -875,0 0,219z');
    this.renderer.setAttribute(path13, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path13, 'click', (event) => {

      this.selectedId = path13.getAttribute('id');
  
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path13.getAttribute('id')));
      

    });


    let path14 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path14, 'style', 'fill:#999;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path14, 'd', 'M28,520 l606,0 0,168 -606,0 0,-168z');
    this.renderer.setAttribute(path14, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path14, 'click', (event) => {

      this.selectedId = path14.getAttribute('id');
      
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path14.getAttribute('id')));
      

    });


    let path15 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path15, 'style', 'fill:#333;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path15, 'd', 'M465,621 l34,0 0,67 -34,0 0,-67z');
    this.renderer.setAttribute(path15, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path15, 'click', (event) => {

      this.selectedId = path15.getAttribute('id');
     
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path15.getAttribute('id')));
      

    });


    let path16 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path16, 'style', 'fill:#b2b2b2;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path16, 'd', 'M634,629 l315,0 0,-21 -315,0 0,21z');
    this.renderer.setAttribute(path16, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path16, 'click', (event) => {

      this.selectedId = path16.getAttribute('id');
     
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path16.getAttribute('id')));
      

    });


    let path17 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path17, 'style', 'fill:#000;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path17, 'd', 'M634,595 l315,0 0,13 -315,0 0,-13z');
    this.renderer.setAttribute(path17, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path17, 'click', (event) => {

      this.selectedId = path17.getAttribute('id');
    
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path17.getAttribute('id')));
      

    });


    let path18 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path18, 'style', 'fill:#000;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path18, 'd', 'M40,536 l581,0 0,13 -581,0 0,-13z');
    this.renderer.setAttribute(path18, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path18, 'click', (event) => {

      this.selectedId = path18.getAttribute('id');
     
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path18.getAttribute('id')));
      

    });


    let path19 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path19, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path19, 'd', 'M40,549 l65,0 0,21 -65,0 0,-21z');
    this.renderer.setAttribute(path19, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path19, 'click', (event) => {

      this.selectedId = path19.getAttribute('id');

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path19.getAttribute('id')));
      

    });


    let path20 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path20, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path20, 'd', 'M105,549 l64,0 0,21 -64,0 0,-21z');
    this.renderer.setAttribute(path20, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path20, 'click', (event) => {

      this.selectedId = path20.getAttribute('id');
    
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path20.getAttribute('id')));
      

    });


    let path21 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path21, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path21, 'd', 'M169,549 l65,0 0,21 -65,0 0,-21z');
    this.renderer.setAttribute(path21, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path21, 'click', (event) => {

      this.selectedId = path21.getAttribute('id');
    
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path21.getAttribute('id')));
      

    });


    let path22 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path22, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path22, 'd', 'M234,549 l64,0 0,21 -64,0 0,-21z');
    this.renderer.setAttribute(path22, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path22, 'click', (event) => {

      this.selectedId = path22.getAttribute('id');
   
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path22.getAttribute('id')));
      

    });


    let path23 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path23, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path23, 'd', 'M298,549 l65,0 0,21 -65,0 0,-21z');
    this.renderer.setAttribute(path23, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path23, 'click', (event) => {

      this.selectedId = path23.getAttribute('id');
  
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path23.getAttribute('id')));
      

    });


    let path24 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path24, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path24, 'd', 'M363,549 l65,0 0,21 -65,0 0,-21z');
    this.renderer.setAttribute(path24, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path24, 'click', (event) => {

      this.selectedId = path24.getAttribute('id');
  
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path24.getAttribute('id')));
      

    });


    let path25 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path25, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path25, 'd', 'M428,549 l64,0 0,21 -64,0 0,-21z');
    this.renderer.setAttribute(path25, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path25, 'click', (event) => {

      this.selectedId = path25.getAttribute('id');

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path25.getAttribute('id')));
      

    });


    let path26 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path26, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path26, 'd', 'M492,549 l65,0 0,21 -65,0 0,-21z');
    this.renderer.setAttribute(path26, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path26, 'click', (event) => {

      this.selectedId = path26.getAttribute('id');

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path26.getAttribute('id')));
      

    });


    let path27 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path27, 'style', 'fill:#ccc;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path27, 'd', 'M557,549 l64,0 0,21 -64,0 0,-21z');
    this.renderer.setAttribute(path27, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path27, 'click', (event) => {

      this.selectedId = path27.getAttribute('id');
 
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path27.getAttribute('id')));
      

    });


    let path28 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path28, 'style', 'fill:#e5e5e5;stroke:#7f7f7f;stroke-width:2');
    this.renderer.setAttribute(path28, 'd', 'M377,195 l12,-28 9,-22 29,-7 28,-8 15,-6 28,2 30,0 26,-6 26,-7 19,-17 5,-10 30,-2 19,-8 3,-4 0,-2 -1,-3 -31,-7 -29,-1 -28,-2 -4,-5 -2,-14 -1,-1 -2,0 -2,1 -28,-3 -27,3 -28,2 -32,-2 -29,1 -25,7 -24,8 -26,-7 -23,-15 -27,-3 -7,-1 -6,0 -6,0 -27,13 -18,26 -14,15 -2,0 -7,-1 -4,2 -14,25 3,29 -4,17 -1,3 0,4 8,32 0,2 1,1 2,1 2,0 1,0 8,-1 9,-25 8,-18 -2,-7 12,-23 7,-4 2,0 24,23 9,22 -3,32 25,-2 6,-26 20,-23 9,-17 3,-1 3,-1 18,13 -1,30 5,26 21,0z');
    this.renderer.setAttribute(path28, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path28, 'click', (event) => {

      this.selectedId = path28.getAttribute('id');

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path28.getAttribute('id')));
      

    });

    let path29 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path29, 'style', 'fill:#b2b2b2');
    this.renderer.setAttribute(path29, 'd', 'M373,191 l11,-28 10,-22 5,2 24,-17 4,-6 30,-1 28,1 29,-4 32,-8 14,-7 3,-11 3,-4 28,-1 18,-6 2,-3 0,-3 -1,-2 -1,-1 -32,-4 -30,5 -20,2 -1,-1 -3,-5 -29,-14 -26,-5 -26,8 -29,1 -28,-3 -30,6 -27,6 -5,-1 -11,1 -15,-21 -4,-1 -6,1 -16,6 -26,3 -23,19 -15,14 -7,0 -3,1 -13,21 2,27 -3,12 0,3 0,3 6,26 1,2 0,1 1,1 10,-1 8,-25 1,-16 15,-23 21,-17 5,2 1,2 0,1 -5,8 -1,6 21,23 4,7 2,6 -3,27 16,3 1,-1 6,-27 1,-6 17,-24 4,-9 25,1 4,1 9,13 0,32 4,21 11,3 2,0z');
    this.renderer.setAttribute(path29, 'id', 'path_' + this.pathId++);
    this.renderer.listen(path29, 'click', (event) => {

      this.selectedId = path29.getAttribute('id');
  
      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(path29.getAttribute('id')));
      

    });



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

    // this.makePathsClickable();

  }



  circle() {
    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'id', this.svgId);
    this.renderer.setAttribute(svg, 'width', '350');
    this.renderer.setAttribute(svg, 'height', '200');
    this.svgId++;

    this.renderer.listen(svg, 'click', (event) => {

      this.resetPropertyTable();
      // alert(this.getAllAttributes(svg.getAttribute('id')));
      this.displayProperties(this.getAllAttributes(svg.getAttribute('id')));

      this.selectedId = svg.getAttribute('id');

    });

    let circle = this.renderer.createElement('circle', 'svg');

    this.renderer.setAttribute(circle, 'cx', '50');

    this.renderer.setAttribute(circle, 'cy', '50');
    this.renderer.setAttribute(circle, 'r', '40');
    this.renderer.setAttribute(circle, 'stroke', 'green');
    this.renderer.setAttribute(circle, 'stroke-width', '4');
    this.renderer.setAttribute(circle, 'fill', 'yellow');





    this.renderer.appendChild(svg, circle);
    this.renderer.appendChild(this.designCanvas.nativeElement, svg);
  }

  rectangle() {



    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'id', this.svgId);
    this.renderer.setAttribute(svg, 'width', '350');
    this.renderer.setAttribute(svg, 'height', '200');
    this.svgId++;

    this.renderer.listen(svg, 'click', (event) => {

      this.resetPropertyTable();
      this.displayProperties(this.getAllAttributes(svg.getAttribute('id')));

      this.selectedId = svg.getAttribute('id');

    });

    let rectangle = this.renderer.createElement('rect', 'svg');

    this.renderer.setAttribute(rectangle, 'x', '50');
    this.renderer.setAttribute(rectangle, 'y', '20');
    this.renderer.setAttribute(rectangle, 'rx', '20');
    this.renderer.setAttribute(rectangle, 'ry', '20');
    this.renderer.setAttribute(rectangle, 'width', '300');
    this.renderer.setAttribute(rectangle, 'height', '100');
    this.renderer.setAttribute(rectangle, 'style', 'fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)');



    this.renderer.appendChild(svg, rectangle);
    this.renderer.appendChild(this.designCanvas.nativeElement, svg);

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

    for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {

      if (i != 0) {
        arr.push(atts[i].nodeName);
        arr.push(atts[i].nodeValue);
      }
    }

    let children = el.children;

    for (let j = 0; j < children.length; j++) {

      let childNode = children[j];

      for (let k = 0, atts = childNode.attributes; k < atts.length; k++) {
        if (k != 0) {
          arr.push(atts[k].nodeName);
          arr.push(atts[k].nodeValue);
        }
      }

    }
    // alert(arr);
    return arr;


  }

  displayProperties(properties: any) {


    let tbody = this.renderer.createElement('tbody');

    // For SVG Color change - all paths color will be changed

    let tr = this.renderer.createElement('tr');

    let td = this.renderer.createElement('td');
    let tdText = this.renderer.createText("Color");
    this.renderer.appendChild(td, tdText);

    let td1 = this.renderer.createElement('td');

    let input = this.renderer.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', '');
    this.renderer.listen(input, 'change', (event) => {


      let children = document.getElementById(this.selectedId).children;

      for (let i = 0; i < children.length; i++) {

        children[i].setAttribute('style', children[i].getAttribute('style') + '; fill: ' + input.value + '');

      }



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

      // if(i == 0)
      //   input.setAttribute('disabled', 'true');

      this.renderer.listen(input, 'change', (event) => {

        // alert('nputValue: ' + input.value);

        let children = document.getElementById(this.selectedId);
        children.setAttribute(properties[i], input.value);

        // alert('Selected id: ' + this.selectedId + ' and change require: ' + properties[i] + '=' + input.value);
        // children.setAttribute('position', 'absolute');


      });

      this.renderer.appendChild(td1, input);

      this.renderer.appendChild(tr, td);
      this.renderer.appendChild(tr, td1);

      this.renderer.appendChild(tbody, tr);

    }

    this.renderer.appendChild(this.propertyTable.nativeElement, tbody);

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

  // this is used later in the resizing and gesture demos
//dragable - end