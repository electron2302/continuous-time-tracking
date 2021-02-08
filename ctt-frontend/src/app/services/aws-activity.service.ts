import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';
import {
  APIService,
  CreateActivityInput as APICreateInput,
  UpdateActivityInput,
} from './API.service';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService implements ActivityService {
  constructor(private api: APIService) {}

  create(input: CreateActivityInput): Promise<Activity> {
    return this.insert(input);
  }

  insert(insert: CreateActivityInput): Promise<Activity> {
    const activityInput: APICreateInput = {
      categoryID: insert.categoryID,
      from: insert.from.toISOString(),
    };

    return this.api.CreateActivity(activityInput).then(
      (result) =>
        Promise.resolve({
          categoryID: result.categoryID,
          from: new Date(Date.parse(result.from)),
          id: result.id,
        } as Activity),
      () =>
        Promise.reject(
          `Could nor insert Activity at starttime ${insert.from.toISOString()}`
        )
    );
  }

  update(activity: Activity): Promise<void> {
    const updateActivity: UpdateActivityInput = {
      id: activity.id,
      categoryID: activity.categoryID,
      from: activity.from.toISOString(),
    };
    return this.api.UpdateActivity(updateActivity).then(
      () => Promise.resolve(),
      () => Promise.reject(`Could not update activity from ${activity.from.toISOString()}`)
    );
  }

  delete(activity: Activity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Activity[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Activity> {
    throw new Error('Method not implemented.');
  }
  getByCategory(category: Category): Promise<Activity[]> {
    throw new Error('Method not implemented.');
  }
  getBetween(from: Date, to: Date, category?: Category): Promise<Activity[]> {
    if (from > new Date()) {
      return Promise.resolve([]);
    }
    if (from.getDate() < new Date().getDate()) {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            {
              categoryID: 'a',
              from: new Date(2021, 1, 4, 0, 0),
              id: 'a1',
            },
            {
              categoryID: 'b',
              from: new Date(2021, 1, 4, 15, 0),
              id: 'b1',
            },
          ]);
        }, 1_000)
      );
    }
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          {
            categoryID: 'a',
            from: new Date(2021, 1, 5, 0, 0),
            id: 'a1',
          },
          {
            categoryID: 'b',
            from: new Date(2021, 1, 5, 7, 0),
            id: 'b1',
          },
          {
            categoryID: 'a',
            from: new Date(2021, 1, 5, 11, 0),
            id: 'a2',
          },
          {
            categoryID: 'c',
            from: new Date(2021, 1, 5, 12, 0),
            id: 'c1',
          },
        ]);
      }, 1_000)
    );
  }
  subscribeToActivities(from?: Date, to?: Date): Observable<Activity[]> {
    throw new Error('Method not implemented.');
  }
}
