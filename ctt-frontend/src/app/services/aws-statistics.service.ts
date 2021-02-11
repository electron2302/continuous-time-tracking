import { Injectable } from '@angular/core';
import { QueryDuration, StatisticsService } from './statistics.service';
import { DataStore } from 'aws-amplify';
import {
  Category as CategoryModel,
  Activity as ActivityModel,
} from '../../models';

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
    const categories = await DataStore.query(CategoryModel);
    categories.forEach(async (category) => {
      colors.push(category.color);
      const activities = await DataStore.query(ActivityModel, (criteria) =>
        criteria
          .categoryID('eq', category.id)
          .from('ge', from.toISOString())
          .from('le', to.toISOString())
      );
      //console.log(JSON.stringify(activities));
      data.push({ name: category.name, value: activities.length + 1 });
    });
    return { data, colors };
  }
}
