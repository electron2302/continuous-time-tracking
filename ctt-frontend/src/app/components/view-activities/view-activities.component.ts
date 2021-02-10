import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nextDayMidnight, startOfToday } from '../../helper/time';
import { Category, toCategoryMap } from '../../interfaces/category';
import {
  toViewableActivities,
  ViewableActivity,
} from '../../interfaces/viewable-activity';
import { ActivityService } from '../../services/activity.service';
import { CategoryService } from '../../services/category.service';

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
  public edit = false;

  constructor(
    private activityService: ActivityService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCategories();
    this.currentDay = startOfToday();
    await this.getActivities();
  }

  public changeDay(delta: number): void {
    this.currentDay = new Date(
      this.currentDay.setDate(this.currentDay.getDate() + delta)
    );
    this.getActivities();
  }

  public navigateToEditActivity(id: string): void {
    this.router.navigate([`activity/${id}`]);
  }

  public toggleEdit(): void {
    this.edit = !this.edit;
  }

  private async getCategories(): Promise<void> {
    this.categoryById = toCategoryMap(await this.categoryService.getAll());
  }

  private async getActivities(): Promise<void> {
    this.loading = true;
    const from = this.currentDay;
    const to = nextDayMidnight(new Date(this.currentDay));
    const activities = await this.activityService.getBetween(from, to);
    this.viewableActivities = toViewableActivities(
      this.categoryById,
      activities
    );
    this.loading = false;
  }
}
