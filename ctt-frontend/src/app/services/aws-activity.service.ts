/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';
import {
  APIService,
  CreateActivityInput as APICreateInput,
  UpdateActivityInput,
  DeleteActivityInput,
  SubscriptionResponse,
  OnCreateActivitySubscription,
  OnDeleteActivitySubscription,
  OnUpdateActivitySubscription,
} from './API.service';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService implements ActivityService {
  private activitySubjects: DateSubscriber[] = [];
  constructor(private api: APIService) {
    //this.api.OnCreateActivityListener.subscribe(this.activityCreated);
    //this.api.OnUpdateActivityListener.subscribe(this.activityUpdated);
    //this.api.OnDeleteActivityListener.subscribe(this.activityDeleted);
  }

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
        this.notifyObservers(activity.from);
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
      () => {
        this.notifyObservers(activity.from);
        return Promise.resolve();
      },
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
      () => {
        this.notifyObservers(activity.from);
        return Promise.resolve();
      },
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
    return this.api
      .ListActivitys({
        categoryID: { eq: category.id },
      })
      .then(
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
        () =>
          Promise.reject(
            `Could not query activities for category ${category.name}.`
          )
      );
  }

  getBetween(from: Date, to: Date, category?: Category): Promise<Activity[]> {
    return this.api
      .ListActivitys(
        //{
        //and: [
        {
          from: { between: [from.toISOString(), to.toISOString()] }, //},
          //{ categoryID: { eq: category?.id } },
          //],
        }
      )
      .then(
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
          return list.sort((a, b) => (a.from < b.from ? -1 : 1));
        },
        (res) =>
          Promise.reject(
            `Could not query activities between ${from.toISOString()} and ${to.toISOString()}.`
          )
      );
  }

  subscribeToActivities(from?: Date, to?: Date): Observable<Activity[]> {
    const sub = new DateSubscriber(new Subject<Activity[]>(), from, to);
    this.activitySubjects.push(sub);
    return sub.subscribeable.asObservable();
  }

  activityCreated(
    val: SubscriptionResponse<OnCreateActivitySubscription>
  ): void {
    if (val.value && val.value.data) {
      const date: Date = new Date(Date.parse(val.value.data.from));
      this.notifyObservers(date);
    }
  }
  activityUpdated(
    val: SubscriptionResponse<OnUpdateActivitySubscription>
  ): void {
    if (val.value && val.value.data) {
      const date: Date = new Date(Date.parse(val.value.data.from));
      this.notifyObservers(date);
    }
  }
  activityDeleted(
    val: SubscriptionResponse<OnDeleteActivitySubscription>
  ): void {
    if (val.value && val.value.data) {
      const date: Date = new Date(Date.parse(val.value.data.from));
      this.notifyObservers(date);
    }
  }

  notifyObservers(affected: Date): void {
    this.activitySubjects.forEach((item) => {
      if (item.from && item.from < affected && item.to && item.to > affected) {
        this.getBetween(item.from, item.to).then((result) =>
          item.subscribeable.next(
            result.sort((a, b) => (a.from < b.from ? -1 : 1))
          )
        );
      } else {
        this.getAll().then((result) =>
          item.subscribeable.next(
            result.sort((a, b) => (a.from < b.from ? -1 : 1))
          )
        );
      }
    });
  }
}

class DateSubscriber {
  from?: Date;
  to?: Date;
  subscribeable: Subject<Activity[]>;

  constructor(subscribable: Subject<Activity[]>, from?: Date, to?: Date) {
    this.from = from;
    this.to = to;
    this.subscribeable = subscribable;
  }
}
