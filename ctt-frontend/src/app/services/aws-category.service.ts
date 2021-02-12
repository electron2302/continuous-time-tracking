import { Injectable } from '@angular/core';
import { CategoryService, CreateCategoryInput } from './category.service';
import { StatisticType } from '../interfaces/statistics';
import {
  Category as AwsCategory,
  StatisticType as AwsStatisticType,
} from '../../models';
import { Category } from '../interfaces/category';
import { DataStore } from 'aws-amplify';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AwsCategoryService implements CategoryService {
  constructor() {}

  async create(input: CreateCategoryInput): Promise<Category> {
    const result = await DataStore.save(
      new AwsCategory({
        color: input.color,
        name: input.name,
        reminderInterval: input.reminderInterval,
        excludeFromStatistics: input.excludeFromStatistics.map((s) =>
          this.convertStatisticTypeToApiStatisticType(s)
        ),
      })
    );
    return this.awsCategorytoCategory(result);
  }

  async getById(id: string): Promise<Category> {
    const result = await DataStore.query(AwsCategory, id);
    if (result) {
      return this.awsCategorytoCategory(result);
    } else {
      throw new Error(`Couldn't find category with id ${id}`);
    }
  }

  async getAll(): Promise<Category[]> {
    const result = await DataStore.query(AwsCategory);
    return result.map((c) => this.awsCategorytoCategory(c));
  }

  async update(category: Category): Promise<void> {
    const old = await DataStore.query(AwsCategory, category.id);
    if (old) {
      await DataStore.save(
        AwsCategory.copyOf(old, (updated) => {
          updated.name = category.name;
          updated.color = category.color;
          updated.reminderInterval = category.reminderInterval;
          updated.excludeFromStatistics = this.convertExcludeFromStatisticstoAws(
            category.excludeFromStatistics
          );
        })
      );
    } else {
      throw new Error(`Couldn't find category with id ${category.id}`);
    }
  }

  public allAsObservable(): Observable<Category[]> {
    return new Observable((subscribe) => {
      DataStore.observe(AwsCategory).subscribe(async (next) => {
        subscribe.next(await this.getAll());
      });
    });
  }

  private awsCategorytoCategory(awsCategory: AwsCategory): Category {
    return {
      color: awsCategory.color,
      id: awsCategory.id,
      name: awsCategory.name,
      reminderInterval: awsCategory.reminderInterval,
      excludeFromStatistics: this.convertAwsExcludeFromStatisitcs(
        awsCategory.excludeFromStatistics
      ),
    };
  }

  private convertExcludeFromStatisticstoAws(
    excludeFromStatistics: StatisticType[]
  ): (AwsStatisticType | null)[] {
    return excludeFromStatistics.map((s) => {
      switch (s) {
        case StatisticType.absoluteTime:
          return AwsStatisticType.ABSOLUTE_TIME;
        case StatisticType.relativeTime:
          return AwsStatisticType.RELATIVE_TIME;
      }
    });
  }

  private convertAwsExcludeFromStatisitcs(
    excludeFromStatistics?:
      | (AwsStatisticType | null)[]
      | keyof typeof AwsStatisticType
  ): StatisticType[] {
    const result: StatisticType[] = [];
    if (Array.isArray(excludeFromStatistics)) {
      excludeFromStatistics.forEach((e) => {
        if (e) {
          result.push(this.convertApiStatisticTypeToStatisticType(e));
        }
      });
    } else {
      switch (excludeFromStatistics) {
        case 'RELATIVE_TIME':
          result.push(StatisticType.relativeTime);
          break;
        case 'ABSOLUTE_TIME':
          result.push(StatisticType.absoluteTime);
          break;
      }
    }
    return result;
  }

  private convertStatisticTypeToApiStatisticType(
    value: StatisticType
  ): AwsStatisticType | null {
    return value === StatisticType.absoluteTime
      ? AwsStatisticType.ABSOLUTE_TIME
      : AwsStatisticType.RELATIVE_TIME;
  }

  private convertApiStatisticTypeToStatisticType(
    value: AwsStatisticType
  ): StatisticType {
    return value === AwsStatisticType.ABSOLUTE_TIME
      ? StatisticType.absoluteTime
      : StatisticType.relativeTime;
  }
}
