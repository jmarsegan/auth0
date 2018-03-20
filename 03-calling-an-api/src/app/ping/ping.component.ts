import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  API_URL = 'http://localhost:3001/api';
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.getPing().subscribe(data => this.message = data.message,
                             error => this.message = error);
  }

  public securedPing(): void {
    this.message = '';
    this.getSecuredPing().subscribe(data => this.message = data.message,
                                    error => this.message = error);
  }

  getPing(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/public`)
      .pipe(catchError(this.handleError));
  }

  getSecuredPing(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/private`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
}

}
