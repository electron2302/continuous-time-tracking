import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

const email = 'email';
const DEFAULT_EMAIL = 'not defined';
const IS_VERIFIED_KEY = 'email_verified';
const DEFAULT_VERIFIED = 'false';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  getUsername(setter: (value: string) => void): void {
    this.doWithUser((user: any) => user.getUsername()).then(setter);
  }

  getEmail(setter: (value: string) => void): void {
    this.getAttribute(email, DEFAULT_EMAIL, setter);
  }

  isEmailVerified(setter: (value: string) => void): void {
    return this.getAttribute(IS_VERIFIED_KEY, DEFAULT_VERIFIED, setter);
  }

  changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return this.doWithUser((user: any) => {
      user.changePassword(oldPassword, newPassword);
    }).then();
  }

  changeEmail(newEmail: string): void {
    Auth.currentAuthenticatedUser()
      .then((user: any) =>
        Auth.updateUserAttributes(user, {
          email: newEmail,
        })
      )
      .then((result: string) => console.log(result)) // SUCCESS
      .then(() => Auth.verifyCurrentUserAttributeSubmit(email, 'abc123'));
  }

  private getAttribute(
    key: string,
    defaultValue: string,
    setter: (value: any) => void
  ): void {
    const doInAttributes = (err: Error, result: any[]) => {
      let value = defaultValue;
      if (err) {
        console.log('Unable to load ' + key + '.');
        console.log(err);
      }
      result.forEach((cognitoUserAttribute) => {
        if (cognitoUserAttribute.getName() === key) {
          value = cognitoUserAttribute.getValue();
        }
      });
      setter(value);
    };
    this.doWithUser((user: any) => user.getUserAttributes(doInAttributes));
  }

  private async doWithUser(arg: any): Promise<string> {
    return Auth.currentAuthenticatedUser().then((user) => arg(user));
  }
}
