import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input()
  showBackButton = false;

  @Input()
  title: string | null = null;

  @Output()
  backClicked = new EventEmitter<() => void>();

  isSignedInObservable = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isSignedInObserable().subscribe((next) => {
      this.isSignedInObservable = next;
    });
  }

  async ngOnInit(): Promise<void> {
    this.isSignedInObservable = await this.authService.isSignedIn();
  }

  onBackClicked(): void {
    if (this.backClicked.observers.length > 0) {
      this.backClicked.emit(this.goBack.bind(this));
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
