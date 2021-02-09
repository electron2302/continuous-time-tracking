/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';
import {
  APIService,
  CreateActivityInput as APICreateInput,
  UpdateActivityInput,
  DeleteActivityInput,
} from './API.service';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService implements ActivityService {
  private activitySubject = new Subject<Activity[]>();
  private activities: Activity[] = [];

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
      (result) => {
        const activity: Activity = {
          categoryID: result.categoryID,
          from: new Date(Date.parse(result.from)),
          id: result.id,
          version: result._version,
        };
        this.activities.push(activity);
        this.activities = this.activities.sort((a, b) => a.from < b.from ? -1 : 1);
        this.activitySubject.next(this.activities);
        return Promise.resolve(activity);
      },
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
      _version: activity.version,
    };
    return this.api.UpdateActivity(updateActivity).then(
      () => Promise.resolve(),
      () =>
        Promise.reject(
          `Could not update activity from ${activity.from.toISOString()}`
        )
    );
  }

  delete(activity: Activity): Promise<void> {
    const deleteActivity: DeleteActivityInput = {
      id: activity.id,
      _version: activity.version,
    };
    return this.api.DeleteActivity(deleteActivity).then(
      () => Promise.resolve(),
      () =>
        Promise.reject(
          `Could not delete activity from ${activity.from.toISOString()}`
        )
    );
  }

  getAll(): Promise<Activity[]> {
    return this.api.ListActivitys().then(
      (result) => {
        const list: Activity[] = [];
        result.items?.filter((item) => {
          if (!item) {
            return;
          }
          list.push({
            categoryID: item.categoryID,
            from: new Date(Date.parse(item.from)),
            id: item.id,
            version: item._version,
          } as Activity);
        });
        return list;
      },
      () => Promise.reject('Could not query activities.')
    );
  }

  getById(id: string): Promise<Activity> {
    return this.api.GetActivity(id).then(
      (result) =>
        Promise.resolve({
          categoryID: result.categoryID,
          from: new Date(Date.parse(result.from)),
          id: result.id,
          version: result._version,
        } as Activity),
      () => Promise.reject(`Could not get activity with id ${id}`)
    );
  }

  getByCategory(category: Category): Promise<Activity[]> {
    return this.api.ListActivitys({
      categoryID: {eq: category.id}
    }).then(
      (result) => {
        const list: Activity[] = [];
        result.items?.filter((item) => {
          if (!item) {
            return;
          }
          list.push({
            categoryID: item.categoryID,
            from: new Date(Date.parse(item.from)),
            id: item.id,
            version: item._version,
          } as Activity);
        });
        return list;
      },
      () => Promise.reject(`Could not query activities for category ${category.name}.`)
    );
  }

  getBetween(from: Date, to: Date, category?: Category): Promise<Activity[]> {
    return this.api.ListActivitys({
      from: {between: [from.toISOString(), to.toISOString()]}
    }).then(
      (result) => {
        const list: Activity[] = [];
        result.items?.filter((item) => {
          if (!item) {
            return;
          }
          list.push({
            categoryID: item.categoryID,
            from: new Date(Date.parse(item.from)),
            id: item.id,
            version: item._version,
          } as Activity);
        });
        return list;
      },
      () => Promise.reject(`Could not query activities between ${from.toISOString()} and ${to.toISOString()}.`)
    );
  }

  subscribeToActivities(from?: Date, to?: Date): Observable<Activity[]> {
    return this.activitySubject.asObservable();
  }
}
