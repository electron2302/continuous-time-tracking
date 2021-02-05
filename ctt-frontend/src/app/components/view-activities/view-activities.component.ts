import { Component, OnInit } from '@angular/core';
import {
  differenceInMs,
  formatDuration,
  isToday,
  nextDayMidnight,
} from '../../helper/time';
import { Activity } from '../../interfaces/activity';
import { Category } from '../../interfaces/category';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';
import { ViewableActivity } from '../element-activity/element-activity.component';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.scss'],
})
export class ViewActivitiesComponent implements OnInit {
  currentDay: Date = new Date();
  loading = true;

  public categoryById = new Map<string, Category>();
  public viewableActivities: ViewableActivity[] = [];

  constructor(
    private activityService: ActivityService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.currentDay = nextDayMidnight(date);
    await this.getActivities();
  }

  public changeDay(delta: number): void {
    this.currentDay = new Date(
      this.currentDay.setDate(this.currentDay.getDate() + delta)
    );
    this.getActivities();
  }

  private async getCategories(): Promise<void> {
    const categories = await this.categoryService.getAll();
    this.categoryById.clear();
    categories.forEach((c) => {
      this.categoryById.set(c.id, c);
    });
  }

  private async getActivities(): Promise<void> {
    this.loading = true;
    const from = this.currentDay;
    const to = nextDayMidnight(new Date(this.currentDay));
    const activities = await this.activityService.getBetween(from, to);
    this.viewableActivities = this.toViewableActivities(activities);
    this.loading = false;
  }

  private toViewableActivities(activities: Activity[]): ViewableActivity[] {
    const result: ViewableActivity[] = [];

    activities.forEach((a, i) => {
      const category = this.categoryById.get(a.categoryID);
      if (!category) {
        return;
      }
      let durationMs;
      if (i < activities.length - 1) {
        durationMs = differenceInMs(activities[i + 1].from, a.from);
      } else {
        if (isToday(a.from)) {
          durationMs = -1;
        } else {
          durationMs = differenceInMs(nextDayMidnight(a.from), a.from);
        }
      }
      result.push({
        color: category.color,
        from: a.from,
        name: category.name,
        duration: durationMs === -1 ? '' : formatDuration(durationMs),
      });
    });
    return result;
  }
}
