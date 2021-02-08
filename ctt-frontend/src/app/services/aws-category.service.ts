/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { APIService } from './API.service';
import { CategoryService, CreateCategoryInput } from './category.service';
import { CreateCategoryInput as APICreateInput } from './API.service';
import { UpdateCategoryInput as APIUpdateInput } from './API.service';
import { StatisticType as APIStatisticType } from './API.service';
import { StatisticType } from '../interfaces/statistics';

@Injectable({
  providedIn: 'root',
})
export class AwsCategoryService implements CategoryService {
  constructor(private api: APIService) {}

  create(input: CreateCategoryInput): Promise<Category> {
    const i: APICreateInput = {
      name: input.name,
      color: input.color,
      reminderInterval: input.reminderInterval,
      excludeFromStatistics: input.excludeFromStatistics.map((v) =>
        this.convertStatisticTypeToApiStatisticType(v)
      ),
    } as APICreateInput;
    return this.api.CreateCategory(i).then(
      (result) =>
        Promise.resolve({
          color: result.color,
          id: result.id,
          name: result.name,
          reminderInterval: result.reminderInterval,
          version: result._version,
          excludeFromStatistics: result.excludeFromStatistics
            ?.filter((val) => val !== null)
            .map((v) => this.convertApiStatisticTypeToStatisticType(v)),
        } as Category),
      (_err) => Promise.reject(`Category ${input.name} could not be added.`)
    );
  }

  getById(id: string): Promise<Category> {
    return this.api.GetCategory(id).then(
      (result) =>
        Promise.resolve({
          name: result.name,
          id: result.id,
          color: result.color,
          reminderInterval: result.reminderInterval,
          version: result._version,
          excludeFromStatistics: result.excludeFromStatistics
            ?.filter((val) => val !== null)
            .map((v) => this.convertApiStatisticTypeToStatisticType(v)),
        } as Category),
      () => Promise.reject(`Category with id '${id}' does not exist.`)
    );
  }

  getAll(): Promise<Category[]> {
    return this.api.ListCategorys().then(
      (result) => {
        const list: Category[] = [];
        result.items
          ?.filter((val) => val !== null)
          .forEach((item) =>
            list.push({
              name: item?.name,
              id: item?.id,
              color: item?.color,
              reminderInterval: item?.reminderInterval,
              version: item?._version,
              excludeFromStatistics: item?.excludeFromStatistics
                ?.filter((val) => val !== null)
                .map((v) => this.convertApiStatisticTypeToStatisticType(v)),
            } as Category)
          );
        return list;
      },
      () => Promise.reject('Failed to query all Categories.')
    );
  }

  update(category: Category): Promise<void> {
    const i: APIUpdateInput = {
      id: category.id,
      name: category.name,
      color: category.color,
      reminderInterval: category.reminderInterval,
      excludeFromStatistics: category.excludeFromStatistics.map((v) =>
        this.convertStatisticTypeToApiStatisticType(v)
      ),
      _version: category.version,
    };
    return this.api.UpdateCategory(i).then(
      () => Promise.resolve(),
      (result) =>
        Promise.reject(
          `Category ${category.name} with id ${category.id} could not be updated.`
        )
    );
  }

  private convertStatisticTypeToApiStatisticType(
    value: StatisticType
  ): APIStatisticType {
    return value === StatisticType.absoluteTime
      ? APIStatisticType.AbsoluteTime
      : APIStatisticType.RelativeTime;
  }

  private convertApiStatisticTypeToStatisticType(
    value: APIStatisticType | null
  ): StatisticType {
    return value === APIStatisticType.AbsoluteTime
      ? StatisticType.absoluteTime
      : StatisticType.relativeTime;
  }
}
