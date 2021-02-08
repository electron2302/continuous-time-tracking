import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService extends ActivityService {
  create(input: CreateActivityInput): Promise<void> {
    throw new Error('Method not implemented.');
  }
  insert(insert: CreateActivityInput): Promise<Activity> {
    throw new Error('Method not implemented.');
  }
  update(activity: Activity): Promise<void> {
    throw new Error('Method not implemented.');
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
            from: new Date(2021, 1, 8, 0, 0),
            id: 'a1',
          },
          {
            categoryID: 'b',
            from: new Date(2021, 1, 8, 7, 0),
            id: 'b1',
          },
          {
            categoryID: 'a',
            from: new Date(2021, 1, 8, 8, 0),
            id: 'a2',
          },
          {
            categoryID: 'c',
            from: new Date(2021, 1, 8, 10, 0),
            id: 'c1',
          },
        ]);
      }, 1_000)
    );
  }
  subscribeToActivities(from?: Date, to?: Date): Observable<Activity[]> {
    return new Observable();
  }
}
