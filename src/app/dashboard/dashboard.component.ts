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

  airConditioner1() {

    let svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'width', '2.0104in');
    this.renderer.setAttribute(svg, 'height', '0.9248in');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 963 443');
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
    this.renderer.setAttribute(path1, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path1, 'd', 'M813,377 l0,-218');


    let path2 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path2, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path2, 'd', 'M723,269 l180,0');


    let path3 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path3, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path3, 'd', 'M85,262 l-58,-1 0,-212 192,0 30,3 27,9 25,13 22,19 19,22 13,25 9,27 3,30 -3,30 -9,28 -13,25 -19,22 -22,18 -25,14 -27,9 -30,3 -42,-6 -37,-17 -32,-26 -23,-35z');


    let path4 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path4, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path4, 'd', 'M302,306 l-11,6 -12,5 -11,4 -12,3 -13,3 -12,2 -12,1 -12,0 -8,0 -8,0 -7,-1 -8,-1 -7,-1 -8,-1 -6,-2 -7,-2 -17,56 189,-1 -18,-71z');


    let path5 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path5, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path5, 'd', 'M27,378 l909,0 0,38 -909,0 0,-38z');


    let path6 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path6, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path6, 'd', 'M718,358 l24,0 0,19 -24,0 0,-19z');


    let path7 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path7, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path7, 'd', 'M884,358 l24,0 0,19 -24,0 0,-19z');


    let path8 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path8, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path8, 'd', 'M709,358 l9,-18 190,0 9,18 -208,0z');

    let path9 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path9, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path9, 'd', 'M812,298 l-596,-44 -26,-8 -16,-20 -4,-18 8,-26 20,-17 18,-4 9,0 588,79 11,2 9,6 6,10 2,11 -2,11 -6,9 -21,9');

    let path10 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path10, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path10, 'd', 'M813,297 l0,-57');


    let path11 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path11, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path11, 'd', 'M785,269 l56,0');


    let path12 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path12, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path12, 'd', 'M217,141 l0,-19');


    let path13 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path13, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path13, 'd', 'M217,236 l0,-57');


    let path14 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path14, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path14, 'd', 'M188,207 l57,0');


    let path15 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path15, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path15, 'd', 'M217,292 l0,-19');


    let path16 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path16, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path16, 'd', 'M140,207 l19,0');


    let path17 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path17, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path17, 'd', 'M273,207 l19,0');



    let path18 = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path18, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(path18, 'd', 'M27,282 l0,-255');




    let circle1 = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle1, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(circle1, 'cx', '813');
    this.renderer.setAttribute(circle1, 'cy', '268');
    this.renderer.setAttribute(circle1, 'r', '71');


    let circle2 = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle2, 'style', 'fill:#7f547f;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(circle2, 'cx', '812');
    this.renderer.setAttribute(circle2, 'cy', '268');
    this.renderer.setAttribute(circle2, 'r', '28');


    let circle3 = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle3, 'style', 'fill:#7f547f');
    this.renderer.setAttribute(circle3, 'cx', '216');
    this.renderer.setAttribute(circle3, 'cy', '207');
    this.renderer.setAttribute(circle3, 'r', '46');


    let circle4 = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle4, 'style', 'fill:none;stroke:#000;stroke-width:2');
    this.renderer.setAttribute(circle4, 'cx', '216');
    this.renderer.setAttribute(circle4, 'cy', '207');
    this.renderer.setAttribute(circle4, 'r', '46');


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
    this.renderer.appendChild(svg, circle1);
    this.renderer.appendChild(svg, circle2);
    this.renderer.appendChild(svg, circle3);
    this.renderer.appendChild(svg, circle4);



    this.renderer.appendChild(this.designCanvas.nativeElement, svg);
  }

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

    for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {

      if (i != 0) {
        arr.push(atts[i].nodeName);
        arr.push(atts[i].nodeValue);
      }
    }

    let children = el.children;

    for (let j = 0; j < children.length; j++) {

      let childNode = children[j];

      // make path clickable and add id

      this.renderer.setAttribute(childNode, 'id', 'path_' + this.pathId++);
      this.renderer.listen(childNode, 'click', (event) => {



        this.selectedId = childNode.getAttribute('id');

        this.resetPropertyTable();
        this.displayProperties(this.getAllAttributes(childNode.getAttribute('id')));

      });

      // end

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