import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nextDayMidnight, startOfToday } from '../../helper/time';
import { Activity } from '../../interfaces/activity';
import { Category, toCategoryMap } from '../../interfaces/category';
import {
  toViewableActivities,
  ViewableActivity,
} from '../../interfaces/viewable-activity';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-change-activity',
  templateUrl: './change-activity.component.html',
  styleUrls: ['./change-activity.component.scss'],
})
export class ChangeActivityComponent implements OnInit {
  public categories: Category[] = [];
  public categoryById: Map<string, Category> = new Map<string, Category>();
  public lastActivities: ViewableActivity[] = [];
  public loading = true;

  constructor(
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this.updateActivites(
      await this.activityService.getBetween(
        startOfToday(),
        nextDayMidnight(startOfToday())
      )
    );
    this.activityService.subscribeToActivities().subscribe((next) => {
      this.loading = true;
      this.updateActivites(next);
    });
  }

  public navigateToAddCategory() {
    this.router.navigate(['category/new']);
  }

  private async getCategories(): Promise<void> {
    this.categories = await this.categoryService.getAll();
    this.categoryById = toCategoryMap(this.categories);
  }

  private updateActivites(activities: Activity[]): void {
    activities = activities.slice(-1);
    this.lastActivities = toViewableActivities(this.categoryById, activities);
    this.loading = false;
  }
}
