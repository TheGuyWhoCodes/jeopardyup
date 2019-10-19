// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    console.log(this.http
      .get<EventModel[]>(`${ENV.BASE_API}clues`)
      .pipe(
        catchError((error) => this._handleError(error))
      ))
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}clues`)
      .pipe(
        catchError((error) => this._handleError(error))
      );
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