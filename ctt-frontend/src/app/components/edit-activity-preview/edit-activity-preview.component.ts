import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { nextDayMidnight } from '../../helper/time';
import { Activity } from '../../interfaces/activity';
import { toCategoryMap } from '../../interfaces/category';
import {
  toViewableActivities,
  ViewableActivity,
} from '../../interfaces/viewable-activity';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-activity-preview',
  templateUrl: './edit-activity-preview.component.html',
  styleUrls: ['./edit-activity-preview.component.scss'],
})
export class EditActivityPreviewComponent implements OnChanges {
  @Input() newActivity?: Activity;

  public date?: Date;
  public activities: ViewableActivity[] = [];
  public loading = false;

  constructor(
    private categoryService: CategoryService,
    private activityService: ActivityService
  ) {}

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes?.newActivity?.currentValue) {
      const value = changes.newActivity.currentValue;
      this.loading = true;
      const existingActivities = await this.getExistingActivities(
        (value as ViewableActivity).from
      );
      existingActivities.push(value);
      existingActivities.sort((a, b) => a.from.getTime() - b.from.getTime());

      const viewableActivities = toViewableActivities(
        toCategoryMap(await this.categoryService.getAll()),
        existingActivities
      );
      viewableActivities.forEach((a) => {
        if (a.id === 'preview') {
          a.isPreview = true;
        }
      });
      this.activities = viewableActivities;
      this.loading = false;
    }
  }

  private async getExistingActivities(activityFrom: Date): Promise<Activity[]> {
    this.date = activityFrom;
    let from = new Date(activityFrom);
    from.setDate(activityFrom.getDate() - 1);
    from = nextDayMidnight(from);
    const to = nextDayMidnight(activityFrom);
    return await this.activityService.getBetween(from, to);
  }
}
