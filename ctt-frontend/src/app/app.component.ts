import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';

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
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.desktopQuery = media.matchMedia('(min-width: 1200px)');
    this.queryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.queryListener);
    this.desktopQuery.addEventListener('change', this.queryListener);
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
}
