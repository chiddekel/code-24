import { Component } from '@angular/core';
import * as faker from 'faker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  people;
  src: any;
  title = 'code-24';
  copyright = '© Adam Łangowicz 2019';
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

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
