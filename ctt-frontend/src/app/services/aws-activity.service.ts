import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService extends ActivityService {
  private activitySubject = new Subject<Activity[]>();
  private activites: Activity[] = [];

  create(input: CreateActivityInput): Promise<void> {
    console.log(input);
    this.activites.push({
      categoryID: input.categoryID,
      from: input.from,
      id: 'abcdefg',
    });
    this.activitySubject.next(this.activites);
    return Promise.resolve();
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
        }, 50)
      );
    }
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(this.activites);
      }, 50)
    );
  }
  subscribeToActivities(from?: Date, to?: Date): Observable<Activity[]> {
    return this.activitySubject.asObservable();
  }
}
