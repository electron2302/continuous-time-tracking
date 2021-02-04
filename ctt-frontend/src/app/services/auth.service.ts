import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedInSubject = new Subject<boolean>();
  usernameSubject = new Subject<string>();
  isSignedIn = false;
  title = 'ctt-frontend';
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  // store the URL so we can redirect after logging in
  redirectUrl?: string;


  constructor(router: Router) {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.isSignedIn = this.authState === AuthState.SignedIn
      if (this.isSignedIn) {
        router.navigate([this.redirectUrl])
      }
      this.signedInSubject.next(
        this.isSignedIn
      )
      this.usernameSubject.next(
        this.user.username
      )
    });
  }

  isSignedInObserable(): Observable<boolean> {
    return this.signedInSubject.asObservable();
  }

  username(): Observable<String> {
    return this.usernameSubject.asObservable();
  }

  /*
  ngOnDestroy() {
    return onAuthUIStateChange;
  }*/
}
