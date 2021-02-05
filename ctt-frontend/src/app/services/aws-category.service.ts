import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { APIService } from './API.service';
import { CategoryService, CreateCategoryInput } from './category.service';
import { CreateCategoryInput as APICreateInput } from './API.service';
import { StatisticType as APIStatistiyType } from './API.service';
import { StatisticType } from '../interfaces/statistics';

@Injectable({
  providedIn: 'root'
})
export class AwsCategoryService implements CategoryService {

  constructor(private api: APIService) { }

  create(input: CreateCategoryInput): Promise<void> {    
    const i: APICreateInput = {
      name: input.name,
      color: input.color,
      reminderInterval: input.reminderInterval,
      excludeFromStatistics: input.excludeFromStatistics.map((v) =>
        (v === StatisticType.absoluteTime) ? APIStatistiyType.AbsoluteTime : APIStatistiyType.RelativeTime
      ),
    };
    return this.api.CreateCategory(i).then(() => Promise.resolve(), () => Promise.reject(`Category ${ input.name } could not be added.`));
  }

  getById(id: string): Promise<Category> {

    throw new Error('Method not implemented.');
  }

  getAll(): Promise<Category[]> {

    throw new Error('Method not implemented.');
  }

  update(category: Category): Promise<void> {

    throw new Error('Method not implemented.');
  }
}
