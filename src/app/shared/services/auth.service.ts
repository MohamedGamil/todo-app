import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Returns an observable of the user state
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.afAuth.authState;

    console.info('AuthService initialized, user$ observable created!');
    this.user$.subscribe(user => console.info('User: ', user));
  }

  // Checks if user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  // Sign in with email and password
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Get current user as a promise
  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  // isAuthenticated(): Observable<boolean> {
  //   return new Observable<boolean>(observer => {
  //     let isAuthenticated = !!localStorage.getItem('authToken');

  //     // TODO: Check auth status with API

  //     observer.next(isAuthenticated);
  //     observer.complete();
  //   });
  // }
}
