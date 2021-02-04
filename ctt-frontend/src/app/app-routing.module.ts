import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  { 
    path: '', 
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
