import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export type User = firebase.User;
export type MaybeUser = User | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: Observable<MaybeUser>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.afAuth.authState;

    console.info('AuthService initialized, user$ observable created!');
    this.user$.subscribe(user => console.info('User: ', user));
  }

  // Checks if user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      tap(user => {
        console.info('User authentication status:', user);
      }),
      map(user => !!user)
    );
  }

  // Sign in with email and password
  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  async logout(): Promise<void> {
    return await this.afAuth.signOut();
  }

  // Get current user as a promise
  getCurrentUser(): Promise<MaybeUser> {
    return this.afAuth.currentUser;
  }

  getUserObservable(): Observable<MaybeUser> {
    return this.user$;
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

