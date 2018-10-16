import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newMovie: Object;
  errors: any[];
  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newMovie = {
      aname: ""
    }
  }

  createMovie() {
    let observable = this._httpService.newMovie(this.newMovie);
    observable.subscribe(data => {
      if (data['status'] === "bad") {
        this.errors = [];
        for (let key in data['content']['errors']) {
          if (key != "message" && key != "name" && key != "_message") {
            this.errors.push(data['content']['errors'][key]['message']);
          }
        }
      }
      else {
        this._router.navigate(['/']);
      }
    })
  }

}
