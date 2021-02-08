import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  onAuthUIStateChange,
  CognitoUserInterface,
  AuthState,
} from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static loginURL = '/login';
  private static baseURL = '';

  private signedInSubject = new Subject<boolean>();
  private usernameSubject = new Subject<string>();
  private user: CognitoUserInterface | undefined;
  private authState?: AuthState;
  // store the URL so we can redirect after logging in
  private redirectUrl: string = AuthService.baseURL;

  constructor(private router: Router, private zone: NgZone) {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      console.log('CHANGED AUTH UI STATE: ' + authState);
      this.user = authData as CognitoUserInterface;
      if (
        this.authState === AuthState.SignedOut ||
        this.authState === AuthState.SignOut
      ) {
        console.log('SIGN OUT');
        console.log('Router from Auth Service to: ' + router.url);
        console.log('Redirect from Auth Service to: ' + this.getRedirectUrl());
        this.navigateToUrl(AuthService.loginURL);
      }
      if (this.isSignedInState()) {
        console.log('SIGNED IN');
        console.log('Router from Auth Service to: ' + router.url);
        console.log('Redirect from Auth Service to: ' + this.getRedirectUrl());
        this.navigateToUrl(this.getRedirectUrl());
      }
      this.signedInSubject.next(this.isSignedInState());
      let username = '';
      if (this.user && this.user.username) {
        username = this.user.username;
      }
      this.usernameSubject.next(username);
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

  isSignedInObserable(): Observable<boolean> {
    return this.signedInSubject.asObservable();
  }

  usernameObservable(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getAuthState(): AuthState | undefined {
    return this.authState;
  }

  private isSignedInState(): boolean {
    return this.authState === AuthState.SignedIn;
  }

  private navigateToUrl(url: string) {
    this.zone.run(() => this.router.navigate([url]));
  }
}
