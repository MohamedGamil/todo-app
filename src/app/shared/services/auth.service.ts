import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let isAuthenticated = !!localStorage.getItem('authToken');

      // TODO: Check auth status with API

      observer.next(isAuthenticated);
      observer.complete();
    });
  }
}
