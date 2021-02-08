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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Store the attempted URL for redirecting
    this.authService.setRedirectUrl(state.url);

    return this.authService.isSignedIn().then((isSignedIn) => {
      if (isSignedIn) {
        return true;
      }
      // Redirect to the login page
      return this.router.parseUrl(AuthService.loginURL);
    });
  }
}
