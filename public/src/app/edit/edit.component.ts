import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  authorId: String;
  editedAuthor: Object;
  errors: any[];
  found: Boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.found = true;
    this.editedAuthor = { aname: "" };
    this._route.params.subscribe((params: Params) => {
      this.authorId = params['id'];
    })
    this.fetchAuthor();
  }

  fetchAuthor() {
    let obs = this._httpService.thisAuthor(this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.editedAuthor = { aname: data['content']['aname'] };
        console.log("fetched");
      } else {
        this.found = false;
        console.log(data['content']);
      }
    })
  }

  updateAuthor() {
    let obs = this._httpService.editAuthor(this.editedAuthor, this.authorId);
    obs.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      } else {
        this._router.navigate(['/']);
      }
    })
  }

}
