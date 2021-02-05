import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static baseURL = ''

  signedInSubject = new Subject<boolean>();
  usernameSubject = new Subject<string>();
  isSignedIn = false;
  title = 'ctt-frontend';
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  // store the URL so we can redirect after logging in
  redirectUrl: string = AuthService.baseURL;


  constructor(router: Router) {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.isSignedIn = this.authState === AuthState.SignedIn
      if (this.isSignedIn) {
        router.navigate([this.redirectUrl])
      }
      this.signedInSubject.next(this.isSignedIn)
      var username: string = '';
      if (this.user) {
        username = this.user.username!;
      }
      this.usernameSubject.next(username)
    });
  }

  isSignedInObserable(): Observable<boolean> {
    return this.signedInSubject.asObservable();
  }

  usernameObservable(): Observable<String> {
    return this.usernameSubject.asObservable();
  }
}
