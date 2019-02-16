import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetDataService {

  constructor(private http: HttpClient) { }

  getMovies(page) {
    return this.http.get('http://www.omdbapi.com/?s=Batman&apikey=50df8ebb&page=1');
  }

}
