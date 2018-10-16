import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  authorId: String;
  thisAuthor: Object;
  errors: any[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.thisAuthor = {};
    this._route.params.subscribe((params: Params) => {
      this.authorId = params['id'];
      this.fetchAuthor();
    })
  }

  fetchAuthor() {
    let obs = this._httpService.thisAuthor(this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.thisAuthor = data['content'];
        console.log("fetched");
      } else {
        console.log(data['content']);
      }
    })
  }
  voteUp(quoteid) {
    for (let i = 0; i < this.thisAuthor['quotes'].length; i++) {
      if (this.thisAuthor['quotes'][i]['_id'] == quoteid) {
        this.thisAuthor['quotes'][i]['votes']++;
      }
    }
    let obs = this._httpService.editAuthor(this.thisAuthor, this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      }
    })
  }
  voteDown(quoteid) {
    for (let i = 0; i < this.thisAuthor['quotes'].length; i++) {
      if (this.thisAuthor['quotes'][i]['_id'] == quoteid) {
        this.thisAuthor['quotes'][i]['votes']--;
      }
    }
    let obs = this._httpService.editAuthor(this.thisAuthor, this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      }
    })
  }
  deleteQuote(quoteid) {
    for (let i = 0; i < this.thisAuthor['quotes'].length; i++) {
      if (this.thisAuthor['quotes'][i]['_id'] == quoteid) {
        this.thisAuthor['quotes'].splice(i, 1);
      }
    }
    let obs = this._httpService.editAuthor(this.thisAuthor, this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      }
    })
  }


}
