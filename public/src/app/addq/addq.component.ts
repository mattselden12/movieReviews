import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addq',
  templateUrl: './addq.component.html',
  styleUrls: ['./addq.component.css']
})
export class AddqComponent implements OnInit {
  movieId: String;
  thisMovie: Object;
  errors: any[];
  newreview: Object;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.thisMovie = {};
    this.errors = [];
    this._route.params.subscribe((params: Params) => {
      this.movieId = params['id'];
      this.fetchMovie();
    })
    this.newreview = {
      review: ""
    }
  }

  fetchMovie() {
    let obs = this._httpService.thisMovie(this.movieId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.thisMovie = { mtitle: data['content']['mtitle'] };
        console.log("fetched");
      } else {
        console.log(data['content']);
      }
    })
  }
  submitReview() {
    let obs = this._httpService.addReview(this.newreview, this.movieId);
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
        this._router.navigate(['/reviews/' + this.movieId]);
      }
    })
  }

}
