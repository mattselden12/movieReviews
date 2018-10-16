import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newAuthor(authorInfo) {
    return this._http.post('/authors', authorInfo);
  }
  editAuthor(authorInfo, authorid) {
    return this._http.put(`/authors/${authorid}`, authorInfo);
  }
  deleteAuthor(authorid) {
    return this._http.delete(`/authors/${authorid}`);
  }
  allAuthors() {
    return this._http.get('/authors');
  }
  thisAuthor(authorid) {
    return this._http.get(`/authors/${authorid}`);
  }
  addQuote(quote, authorid) {
    return this._http.post(`/api/quotes/${authorid}`, quote);
  }
}
