import { Component, OnInit } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  formFields: FormFieldTypes = [
    { type: "username" },
    { type: "password" },
    { type: "email" }
  ];

  constructor() {}

  ngOnInit(): void {}
    
}
