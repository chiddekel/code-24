import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'node_modules/pixi.js/dist/pixi.js';
declare const PIXI: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pixiDisplacementFiler: any;
  pixiImg: any;
  pixiDepthMap: any;
  pixiApp: any;
  people;
  src: any;
  title = 'code-24';
  copyright = '© Adam Łangowicz 2019';
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  ngOnInit(): void {
      this.pixiApp = new PIXI.Application({
        width: window.innerWidth, height: window.innerHeight
      });
      const $creatCanvas: any = document.querySelector('#webglCanvas');
      $creatCanvas.appendChild(this.pixiApp.view);

      this.pixiImg = new PIXI.Sprite.from('../assets/3d.png');
      this.pixiImg.width = window.innerWidth;
      this.pixiImg.height = window.innerHeight;
      this.pixiApp.stage.addChild(this.pixiImg);

      this.pixiDepthMap = new PIXI.Sprite.from('../assets/3dDepthMap.png');
      this.pixiDepthMap.width = window.innerWidth;
      this.pixiDepthMap.height = window.innerHeight;
      this.pixiApp.stage.addChild(this.pixiDepthMap);

      this.pixiDisplacementFiler = new PIXI.filters.DisplacementFilter(this.pixiDepthMap);
      this.pixiApp.stage.filters = [this.pixiDisplacementFiler];

      window.onmousemove = (e) => {
        this.pixiDisplacementFiler.scale.x = (window.innerWidth / 2 - e.clientX) / 20;
        this.pixiDisplacementFiler.scale.y = (window.innerHeight / 2 - e.clientY) / 20;
      };

  }


  constructor(private toastr: ToastrService) {
    this.people = Array(100)
      .fill(1)
      .map(_ => {
        return {
          name: faker.name.findName(),
          bio:  faker.hacker.phrase(),

        };
      });

    this.showSucess();

  }

  showSucess() {
    this.toastr.info('6164616D2E6C616E676F7769637A407961686F6F2E636F6D', '652D6D61696C3A', { enableHtml :  true});
  }



  onFileSelected() {
  const $pdf: any = document.querySelector('#file');

  if (typeof (FileReader) !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.src = e.target.result;
    };

    reader.readAsArrayBuffer($pdf.files[0]);
    }
}
}
