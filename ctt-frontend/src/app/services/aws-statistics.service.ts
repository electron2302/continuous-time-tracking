import { Injectable } from '@angular/core';
import { QueryDuration, StatisticsService } from './statistics.service';
import { DataStore, SortDirection } from 'aws-amplify';
import {
  Category as CategoryModel,
  Activity as ActivityModel,
} from '../../models';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AwsStatisticsService implements StatisticsService {
  constructor() {}
  timePerCategoryPerInterval(
    from: Date,
    to: Date,
    interval: QueryDuration
  ): Promise<{
    data: { name: string; series: { name: string; value: number }[] }[];
    colors: string[];
  }> {
    throw new Error('Method not implemented.');
  }

  async timePerCategoryAccumulative(
    from: Date,
    to: Date
  ): Promise<{ data: { name: string; value: number }[]; colors: string[] }> {
    const data: { name: string; value: number }[] = [];
    const colors: string[] = [];

    const maps = await this.categoriesOverTime(from, to);
    maps.nameMap.forEach((name: string, id: string) => {
      const time = maps.timeMap.get(id) || 0;
      data.push({ name, value: time });
      const color = maps.colorMap.get(id) || '#000000';
      colors.push(color);
    });

    return { data, colors };
  }

  private async categoriesOverTime(
    from: Date,
    to: Date
  ): Promise<{
    nameMap: Map<string, string>;
    colorMap: Map<string, string>;
    timeMap: Map<string, number>;
  }> {
    const nameMap: Map<string, string> = new Map();
    const colorMap: Map<string, string> = new Map();
    const categories = await DataStore.query(CategoryModel);
    for (const category of categories) {
      nameMap.set(category.id, category.name);
      colorMap.set(category.id, category.color);
    }

    const timeMap: Map<string, number> = new Map();
    const activities = await DataStore.query(
      ActivityModel,
      (criteria) =>
        criteria.from('ge', from.toISOString()).from('le', to.toISOString()),
      { sort: (s) => s.from(SortDirection.ASCENDING) }
    );
    for (let i = 0; i < activities.length - 1; i++) {
      let time = timeMap.get(activities[i].categoryID) || 0;
      time +=
        (new Date(activities[i + 1].from).getTime() -
          new Date(activities[i].from).getTime()) /
        (1000 * 60);
      timeMap.set(activities[i].categoryID, time);
    }

    //duration of last Activity
    const lastActivity = activities[activities.length - 1];
    let time = timeMap.get(lastActivity.categoryID) || 0;
    if (this.isToday(new Date(lastActivity.from))) {
      time +=
        (new Date().getTime() - new Date(lastActivity.from).getTime()) /
        (1000 * 60);
    } else {
      const date = new Date(lastActivity.from);
      time +=
        (this.sameDayMidNight(date).getTime() - date.getTime()) / (1000 * 60);
    }
    timeMap.set(lastActivity.categoryID, time);

    return { nameMap, colorMap, timeMap };
  }

  private isToday(day: Date): boolean {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }

  private sameDayMidNight(day: Date): Date {
    const midNight = new Date(day);
    midNight.setHours(23);
    midNight.setMinutes(59);
    midNight.setSeconds(59);
    midNight.setMilliseconds(999);
    return midNight;
  }
}
