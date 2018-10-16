import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allAuthors: any[];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    let obs = this._httpService.allAuthors();
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.allAuthors = data['content'];
      }
      else {

      }
    })
  }
  deleteAuthor(authorid) {
    for (let i = 0; i < this.allAuthors.length; i++) {
      if (this.allAuthors[i]['_id'] == authorid) {
        this.allAuthors.splice(i, 1);
      }
    }
    let obs = this._httpService.deleteAuthor(authorid);
    obs.subscribe(data => console.log(data));
  }

}
