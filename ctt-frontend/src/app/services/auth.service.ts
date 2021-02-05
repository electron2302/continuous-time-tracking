import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static baseURL = '';

  private signedInSubject = new Subject<boolean>();
  private usernameSubject = new Subject<string>();
  private signedIn = false;
  private title = 'ctt-frontend';
  private user: CognitoUserInterface | undefined;
  private authState!: AuthState;
  // store the URL so we can redirect after logging in
  private redirectUrl: string = AuthService.baseURL;


  constructor(router: Router) {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.setSignedIn(this.authState === AuthState.SignedIn);
      if (this.isSignedIn()) {
        router.navigate([this.redirectUrl]);
      }
      this.signedInSubject.next(this.isSignedIn());
      let username = '';
      if (this.user && this.user.username) {
        username = this.user.username;
      }
      this.usernameSubject.next(username);
    });
  }

  isSignedIn(): boolean {
    return this.signedIn;
  }

  isSignedInObserable(): Observable<boolean> {
    return this.signedInSubject.asObservable();
  }

  usernameObservable(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  private setSignedIn(signedIn: boolean): void {
    this.signedIn = signedIn;
  }
}
