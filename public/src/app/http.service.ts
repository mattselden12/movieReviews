import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newMovie(movieInfo) {
    return this._http.post('/movies', movieInfo);
  }
  editMovie(movieInfo, movieid) {
    return this._http.put(`/movies/${movieid}`, movieInfo);
  }
  deleteMovie(movieid) {
    return this._http.delete(`/movies/${movieid}`);
  }
  allMovies() {
    return this._http.get('/movies');
  }
  thisMovie(movieid) {
    return this._http.get(`/movies/${movieid}`);
  }
  addReview(review, movieid) {
    return this._http.post(`/api/reviews/${movieid}`, review);
  }
}
