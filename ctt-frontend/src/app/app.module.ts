import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from "aws-amplify";
// @ts-ignore
import awsconfig from "../aws-exports";

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth.guard';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, AuthenticationComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyUIAngularModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
