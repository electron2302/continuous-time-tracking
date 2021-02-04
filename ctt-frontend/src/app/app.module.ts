import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AmplifyUIAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
