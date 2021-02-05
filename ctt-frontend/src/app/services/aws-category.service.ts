import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { StatisticType } from '../interfaces/statistics';
import { CategoryService, CreateCategoryInput } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class AwsCategoryService extends CategoryService {
  create(input: CreateCategoryInput): Promise<Category> {
    return Promise.resolve({
      color: '#123455',
      name: 'sleep',
      id: 'a',
      reminderInterval: 10,
      excludeFromStatistics: [StatisticType.absoluteTime],
    });
  }
  getById(id: string): Promise<Category> {
    return Promise.resolve({
      color: '#123455',
      name: 'Sleep',
      id: 'a',
      reminderInterval: 10,
      excludeFromStatistics: [StatisticType.absoluteTime],
    });
  }
  getAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  update(category: Category): Promise<void> {
    return Promise.resolve();
  }
}
