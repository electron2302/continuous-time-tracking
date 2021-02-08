import { Component, OnInit } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  formFields: FormFieldTypes = [
    { type: 'username' },
    { type: 'password' },
    { type: 'email' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    console.log(
      'Authentication Component redirect url: ' +
        this.authService.getRedirectUrl()
    );
    if (await this.authService.isSignedIn()) {
      const redirectURL = this.authService.getRedirectUrl();
      console.log('redirectURL: ' + redirectURL);
      this.router.navigate([redirectURL]);
    }
  }
}
