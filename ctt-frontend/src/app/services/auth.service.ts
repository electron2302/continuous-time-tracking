import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static loginURL = '/login';
  private static baseURL = '';

  private userSubject = new BehaviorSubject<User | undefined>(undefined);
  private authState?: AuthState;
  // store the URL so we can redirect after logging in
  private redirectUrl: string = AuthService.baseURL;

  constructor(private router: Router, private zone: NgZone) {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      console.log('CHANGED AUTH UI STATE: ' + authState);
      if (
        this.authState === AuthState.SignedOut ||
        this.authState === AuthState.SignOut
      ) {
        console.log('SIGN OUT');
        console.log('Router from Auth Service to: ' + router.url);
        console.log('Redirect from Auth Service to: ' + this.getRedirectUrl());
        this.navigateToUrl(AuthService.loginURL);
        this.userSubject.next(undefined);
      } else if (this.isSignedInState()) {
        console.log('SIGNED IN');
        console.log('Router from Auth Service to: ' + router.url);
        console.log('Redirect from Auth Service to: ' + this.getRedirectUrl());
        this.navigateToUrl(this.getRedirectUrl());
      }
      if (authData) {
        const cognitorUserInfo = authData as CognitoUserInterface;
        this.userSubject.next({
          userName: cognitorUserInfo.username || '',
        });
      } else {
        this.userSubject.next(undefined);
      }
    });
  }

  public isSignedIn(): Promise<boolean> {
    if (this.authState) {
      return Promise.resolve(this.isSignedInState());
    } else {
      return Auth.currentAuthenticatedUser()
        .then(() => true)
        .catch(() => false);
    }
  }

  public userObservable(): Observable<User | undefined> {
    Auth.currentAuthenticatedUser()
      .then((cognitoUser: CognitoUserInterface) => {
        this.userSubject.next({
          userName: cognitoUser.username || '',
        });
      })
      .catch(() => this.userSubject.next(undefined));
    return this.userSubject.asObservable();
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }

  public setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  public logout(): void {
    Auth.signOut().then(() => {
      this.navigateToUrl(AuthService.loginURL);
    });
  }

  private isSignedInState(): boolean {
    return this.authState === AuthState.SignedIn;
  }

  private navigateToUrl(url: string) {
    this.zone.run(() => this.router.navigate([url]));
  }
}
