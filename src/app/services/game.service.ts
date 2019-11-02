import { Injectable } from '@angular/core';
import { JeopardyBoard } from '../jeopardy-board';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = 'http://ariagno.localtunnel.me/api/rando_clues'

  constructor(private http: HttpClient) { }

  getGame(showNumber: number, round: string): Promise<JeopardyBoard> {
    var url = this.gamesUrl
    return this.http.get(url)
                .toPromise()
                .then(response => response as JeopardyBoard)
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {

    console.error('An error occurred', error); // for demo purposes only

    return Promise.reject(error.message || error);

  }
}
