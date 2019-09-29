import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogsRouteService {

  constructor(private http: HttpClient) { }

  getAllRoutes(): Observable<any> {
    return this.http.get('http://infinite-lake-80504.herokuapp.com/api/routes/');
  }

  getRoute(route): Observable<any> {
    return this.http.get('http://infinite-lake-80504.herokuapp.com/api/routes/' + route);
  }
}
