import { Component, OnInit } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  formFields: FormFieldTypes = [
    { type: 'username' },
    { type: 'password' },
    { type: 'email' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    if (this.authService.isSignedIn()) {
      this.router.navigate([AuthService.baseURL]);
    }
  }
}
