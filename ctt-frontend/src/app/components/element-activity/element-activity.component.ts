import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { differenceInMs, formatDuration } from '../../helper/time';
import { ViewableActivity } from '../../interfaces/viewable-activity';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-element-activity',
  templateUrl: './element-activity.component.html',
  styleUrls: ['./element-activity.component.scss'],
})
export class ElementActivityComponent implements OnInit {
  @Input() viewableActivity: ViewableActivity | null = null;
  @Input() edit = false;

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

  constructor(
    private router: Router,
    private activityService: ActivityService
  ) {}

  public linearRepeatingGradient(): string {
    return (
      `repeating-linear-gradient(45deg, ${this.viewableActivity?.color},` +
      `${this.viewableActivity?.color} 10px, #303030 10px, #303030 20px)`
    );
  }

  public navigateToEdit(): void {
    this.router.navigate([`activity/${this.viewableActivity?.id}`]);
  }

  public async delete(): Promise<void> {
    if (this.viewableActivity) {
      const activity = await this.activityService.getById(
        this.viewableActivity.id
      );
      await this.activityService.delete(activity);
    }
  }

  ngOnInit(): void {}
}
