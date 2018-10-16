import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addq',
  templateUrl: './addq.component.html',
  styleUrls: ['./addq.component.css']
})
export class AddqComponent implements OnInit {
  authorId: String;
  thisAuthor: Object;
  errors: any[];
  newquote: Object;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.thisAuthor = {};
    this.errors = [];
    this._route.params.subscribe((params: Params) => {
      this.authorId = params['id'];
      this.fetchAuthor();
    })
    this.newquote = {
      quote: ""
    }
  }

  fetchAuthor() {
    let obs = this._httpService.thisAuthor(this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.thisAuthor = { aname: data['content']['aname'] };
        console.log("fetched");
      } else {
        console.log(data['content']);
      }
    })
  }
  submitQuote() {
    let obs = this._httpService.addQuote(this.newquote, this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      }
      else {
        this._router.navigate(['/quotes/' + this.authorId]);
      }
    })
  }

}
