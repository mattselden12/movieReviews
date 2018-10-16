import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allMovies: any[];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    let obs = this._httpService.allMovies();
    obs.subscribe(data => {
      if (data['status'] === "good") {
        this.allMovies = data['content'];
      }
      else {

      }
    })
  }
  deleteMovie(movieid) {
    for (let i = 0; i < this.allMovies.length; i++) {
      if (this.allMovies[i]['_id'] == movieid) {
        this.allMovies.splice(i, 1);
      }
    }
    let obs = this._httpService.deleteMovie(movieid);
    obs.subscribe(data => console.log(data));
  }

}
