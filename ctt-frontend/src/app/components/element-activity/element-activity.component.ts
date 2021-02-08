import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { differenceInMs, formatDuration } from '../../helper/time';

export interface ViewableActivity {
  color: string;
  name: string;
  from: Date;
  duration: string;
}

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

  ngOnInit(): void {}
}
