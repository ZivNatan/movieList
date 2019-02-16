import { Component, OnInit,  ViewChild } from '@angular/core';
import { GetDataService } from './get-data.service';
import { AnonymousSubject } from 'rxjs/Subject';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  list: any;
  selectedIndex: any;
  modalTitle: string;
  formItem: any = {};
  selectedItem = {
    title: ''
  };
  height: any;

  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    this.height = window.innerHeight - 150;
      this.getDataService.getMovies(1).subscribe(response => {
        this.list = response['Search'];
      });
  }

  deleteItem() {
     this.list.splice(this.selectedIndex, 1);
  }
  editMovie(item, index, title) {
    this.formItem = Object.create(item);
    this.selectedIndex = index;
    this.modalTitle = title;
  }
  submitMovie(form) {
    console.log(form);
    if (form.valid) {
      if ( this.modalTitle === 'Add') {
        this.list.push(this.formItem);
      } else {
        this.list[this.selectedIndex] = this.formItem;
      }
      form.submitted = false;
    }
  }

  fixTitle(title): string {
    title = title.trim();
    title = title.replace(/[^A-Za-z0-9 ]/g, '');
    title = title.toLocaleLowerCase();
    let arrayOfWords = title.split(' ');
    arrayOfWords = arrayOfWords.map(word =>
      word.replace(/^\w/, c => c.toUpperCase())
    );
    title = arrayOfWords.join(' ');
    // console.log('words', words );
    // title = title.replace(/^\w/, c => c.toUpperCase());
    return title;
  }

}
