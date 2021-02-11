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

    const maps = await this.CategoriesOverTime(from, to);

    maps.nameMap.forEach((Name: string, ID: string) => {
      const time = maps.timeMap.get(ID) || 0;
      data.push({ name: Name, value: time });
      const color = maps.colorMap.get(ID) || '#000000';
      colors.push(color);
    });

    console.log(JSON.stringify({ data, colors }));
    return { data, colors };
  }

  private async CategoriesOverTime(
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
    console.log(activities);
    for (let i = 0; i < activities.length - 1; i++) {
      let time = timeMap.get(activities[i].categoryID) || 0;
      time +=
        (new Date(activities[i + 1].from).getTime() -
          new Date(activities[i].from).getTime()) /
        (1000 * 60);
      timeMap.set(activities[i].categoryID, time);
      console.log(time);
    }
    // TODO: last element till mitnight ?
    // TODO last element till now ?

    return { nameMap, colorMap, timeMap };
  }
}
