import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { differenceInMs, formatDuration } from '../../helper/time';
import { ViewableActivity } from '../../interfaces/viewable-activity';

@Component({
  selector: 'app-element-activity',
  templateUrl: './element-activity.component.html',
  styleUrls: ['./element-activity.component.scss'],
})
export class ElementActivityComponent implements OnInit {
  @Input() viewableActivity: ViewableActivity | null = null;

  ongoingDuration = new Observable<string>((observer: Observer<string>) => {
    setInterval(
      () =>
        observer.next(
          `${formatDuration(
            differenceInMs(
              new Date(),
              this.viewableActivity?.from || new Date()
            )
          )}`
        ),
      1000
    );
  });

  constructor() {}

  public linearRepeatingGradient(): string {
    return (
      `repeating-linear-gradient(45deg, ${this.viewableActivity?.color},` +
      `${this.viewableActivity?.color} 10px, #303030 10px, #303030 20px)`
    );
  }

  ngOnInit(): void {}
}
