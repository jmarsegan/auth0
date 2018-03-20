import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  API_URL = 'http://localhost:3001/api';
  message: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public adminPing(): void {
    this.message = '';
    this.getSecuredPing().subscribe(data => this.message = data.message,
                             error => this.message = error);
  }

  getPing(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/admin`, {})
      .pipe(catchError(this.handleError));
  }

  getSecuredPing(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/admin`, {}, {
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
