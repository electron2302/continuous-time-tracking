import { Component, OnInit } from '@angular/core';
import {
  differenceInMs,
  formatDuration,
  isToday,
  nextDayMidnight,
} from '../../helper/time';
import { Activity } from '../../interfaces/activity';
import { Category } from '../../interfaces/category';
import { ViewableActivity } from '../element-activity/element-activity.component';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.scss'],
})
export class ViewActivitiesComponent implements OnInit {
  public activities: Activity[] = [
    {
      categoryID: 'a',
      from: new Date(2021, 1, 5, 0, 0),
      id: 'a1',
    },
    {
      categoryID: 'b',
      from: new Date(2021, 1, 5, 7, 0),
      id: 'b1',
    },
    {
      categoryID: 'a',
      from: new Date(2021, 1, 5, 11, 0),
      id: 'a2',
    },
    {
      categoryID: 'c',
      from: new Date(2021, 1, 5, 12, 0),
      id: 'c1',
    },
  ];

  public categories: Category[] = [
    {
      id: 'a',
      color: '#238a85',
      name: 'Sleep',
      reminderInterval: 0,
      excludeFromStatistics: [],
    },
    {
      id: 'b',
      color: '#123456',
      name: 'Work',
      reminderInterval: 0,
      excludeFromStatistics: [],
    },
    {
      id: 'c',
      color: '#3a7732',
      name: 'Learn',
      reminderInterval: 0,
      excludeFromStatistics: [],
    },
  ];

  public categoryById = new Map<string, Category>();
  public viewableActivities: ViewableActivity[] = [];

  constructor() {
    this.fillCategoryById();
    this.viewableActivities = this.toViewableActivities();
  }

  ngOnInit(): void {}

  private fillCategoryById(): void {
    this.categories.forEach((c) => {
      this.categoryById.set(c.id, c);
    });
  }

  private toViewableActivities(): ViewableActivity[] {
    const result: ViewableActivity[] = [];

    this.activities.forEach((a, i) => {
      const category = this.categoryById.get(a.categoryID);
      if (!category) {
        return;
      }
      console.log(a.from);
      let durationMs;
      if (i < this.activities.length - 1) {
        durationMs = differenceInMs(this.activities[i + 1].from, a.from);
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
