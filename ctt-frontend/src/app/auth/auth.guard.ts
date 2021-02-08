import { convertPropertyBindingBuiltins } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    console.log('Start go to Site');

    // Store the attempted URL for redirecting
    const url = this.router.parseUrl(state.url);
    this.authService.setRedirectUrl(url.toString());

    const result = await this.authService.isSignedIn().then((isSignedIn) => {
      console.log(isSignedIn);
      if (!isSignedIn) {
        console.log('Not signed in');
        // Redirect to the login page
        this.router.navigate([AuthService.loginURL]);
      }
      return isSignedIn;
    });

    console.log('End go to');

    return result;
  }
}
