import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  movieId: String;
  editedMovie: Object;
  errors: any[];
  found: Boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.found = true;
    this.editedMovie = { mtitle: "" };
    this._route.params.subscribe((params: Params) => {
      this.movieId = params['id'];
    })
    this.fetchMovie();
  }

  fetchMovie() {
    let obs = this._httpService.thisMovie(this.movieId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.editedMovie = { mtitle: data['content']['mtitle'] };
        console.log("fetched");
      } else {
        this.found = false;
        console.log(data['content']);
      }
    })
  }

  updateMovie() {
    let obs = this._httpService.editMovie(this.editedMovie, this.movieId);
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
