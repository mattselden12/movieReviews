import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  movieId: String;
  thisMovie: Object;
  errors: any[];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.thisMovie = {};
    this._route.params.subscribe((params: Params) => {
      this.movieId = params['id'];
      this.fetchMovie();
    })
  }

  fetchMovie() {
    let obs = this._httpService.thisMovie(this.movieId);
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.thisMovie = data['content'];
        console.log("fetched");
      } else {
        console.log(data['content']);
      }
    })
  }
  voteUp(reviewid) {
    for (let i = 0; i < this.thisMovie['mreviews'].length; i++) {
      if (this.thisMovie['mreviews'][i]['_id'] == reviewid) {
        this.thisMovie['mreviews'][i]['votes']++;
      }
    }
    let obs = this._httpService.editMovie(this.thisMovie, this.movieId);
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
  voteDown(reviewid) {
    for (let i = 0; i < this.thisMovie['mreviews'].length; i++) {
      if (this.thisMovie['mreviews'][i]['_id'] == reviewid) {
        this.thisMovie['mreviews'][i]['votes']--;
      }
    }
    let obs = this._httpService.editMovie(this.thisMovie, this.movieId);
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
  deleteReview(reviewid) {
    for (let i = 0; i < this.thisMovie['mreviews'].length; i++) {
      if (this.thisMovie['mreviews'][i]['_id'] == reviewid) {
        this.thisMovie['mreviews'].splice(i, 1);
      }
    }
    let obs = this._httpService.editMovie(this.thisMovie, this.movieId);
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
