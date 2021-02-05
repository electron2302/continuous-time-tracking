import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { APIService } from './API.service';
import { CategoryService, CreateCategoryInput } from './category.service';
import { CreateCategoryInput as APICreateInput } from './API.service';
import { UpdateCategoryInput as APIUpdateInput } from './API.service';
import { StatisticType as APIStatisticType } from './API.service';
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
        (v === StatisticType.absoluteTime) ? APIStatisticType.AbsoluteTime : APIStatisticType.RelativeTime
      ),
    };
    return this.api.CreateCategory(i).then(() => Promise.resolve(), () => Promise.reject(`Category ${ input.name } could not be added.`));
  }

  getById(id: string): Promise<Category> {

    return this.api.GetCategory(id)
    .then((result) => Promise.resolve({
      name: result.name,
      id: result.id,
      color: result.color,
      reminderInterval: result.reminderInterval,
      excludeFromStatistics: result.excludeFromStatistics
      ?.filter(val => val !== null)
      .map(v => v === APIStatisticType.AbsoluteTime ? StatisticType.absoluteTime : StatisticType.relativeTime)
    } as Category),
    () => Promise.reject(`Category with id '${ id }' does not exist.`));
  }

  getAll(): Promise<Category[]> {

    throw new Error('Method not implemented.');
  }

  update(category: Category): Promise<void> {

    throw new Error('Method not implemented.');
  }
}
