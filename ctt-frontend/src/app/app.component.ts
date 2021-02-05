import { Component, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.ref.detectChanges();
  }

  ngOnDestroy() {}
}
