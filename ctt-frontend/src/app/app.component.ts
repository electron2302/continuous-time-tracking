import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

/** Config for floating action button */
interface FabConfig {
  route: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('snav') sidenav?: MatSidenav;

  mobileQuery: MediaQueryList;
  desktopQuery: MediaQueryList;

  isSignedIn = false;
  userName = '';

  fabConfig?: FabConfig;

  public items = [
    {
      icon: 'home',
      title: 'Home',
      route: '',
    },
    {
      icon: 'category',
      title: 'Categories',
      route: 'categories',
    },
    {
      icon: 'history',
      title: 'History',
      route: 'activities',
    },
    {
      icon: 'assessment',
      title: 'Statistics',
      route: 'statistics',
    },
  ];

  private queryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.desktopQuery = media.matchMedia('(min-width: 1200px)');
    this.queryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.queryListener);
    this.desktopQuery.addEventListener('change', this.queryListener);
    this.subscribeToRouteDataChanges();
  }

  ngOnInit() {
    this.authService.userObservable().subscribe((next) => {
      if (next) {
        this.userName = next.userName;
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.queryListener);
    this.desktopQuery.removeEventListener('change', this.queryListener);
  }

  logout(): void {
    this.authService.logout();
    this.sidenav?.close();
  }

  closeSideNav(): void {
    if (!this.desktopQuery.matches) {
      this.sidenav?.close();
    }
  }

  navigateHome(): void {
    this.navigateTo('');
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private subscribeToRouteDataChanges(): void {
    // see https://medium.com/@tomastrajan/how-to-get-route-path-parameters-in-non-routed-angular-components-32fc90d9cb52
    // on how to access route data on non routed components
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute.root),
        map((root) => root.firstChild),
        switchMap((firstChild) => {
          if (firstChild) {
            return firstChild.data;
          } else {
            return of(null);
          }
        })
      )
      .subscribe((next) => {
        this.fabConfig = next?.fab;
      });
  }
}
