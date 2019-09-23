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
    this.toastr.info('adam.langowicz@yahoo.com', 'Contact, e-mail:', { enableHtml :  true});
  }
}
