import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ctt-frontend';
  user: CognitoUserInterface | undefined;
  authState!: AuthState;
  formFields: FormFieldTypes = [
    { type: "username" },
    { type: "password" },
    { type: "email" }
  ];
 
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
