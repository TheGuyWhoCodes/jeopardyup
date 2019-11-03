// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import 'rxjs/add/operator/map'
import { CategoryModel } from './models/category.model';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  // GET list of public, future events
  getEvents$(question?: string, min?: Date, max?: Date, diff?: String, category?: number[]): Observable<EventModel[]> {
    console.log("Category is: " + category)
    var url = `${ENV.BASE_API}clues?`;
    if(question != undefined) {
      url += "keyword="+question + "&";
    }
    if(min != undefined) {
      url += "min_date="+min + "&";
    }
    if(max != undefined) {
      url += "max_date="+max + "&";

    }
    if(diff != undefined) {
      url += "value="+diff + "&";
    }
    if(category != [] && category != undefined) {
      if(category.length != 0)
        url += "category=["+ category + "]&";
    }
    console.log(url);
    return this.http
      .get<EventModel[]>(url)
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  getCategories$(){
    return this.http
    .get<CategoryModel[]>(`${ENV.BASE_API}categories`)
  }

  getEventById$(id: string): Observable<EventModel> {
      return this.http
      .get<EventModel[]>(`${ENV.BASE_API}clues/?id=${id}`).map(x => x[0])
  }


  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      console.log("fuck me right")
    }
    return ObservableThrowError(errorMsg);
  }

}