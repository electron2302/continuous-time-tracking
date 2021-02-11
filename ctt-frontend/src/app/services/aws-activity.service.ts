/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';
import { ActivityService, CreateActivityInput } from './activity.service';
import { DateSubscriber } from '../helper/DateSubscriber';
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Activity as AwsActivity } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AwsActivityService implements ActivityService {
  private activitySubjects: DateSubscriber[] = [];

  constructor() {
    DataStore.observe(AwsActivity).subscribe((msg, owner = this) =>
      this.activityCreated(msg, owner)
    );
  }

  create(input: CreateActivityInput): Promise<Activity> {
    return this.insert(input);
  }

  insert(insert: CreateActivityInput): Promise<Activity> {
    return DataStore.save(
      new AwsActivity({
        categoryID: insert.categoryID,
        from: insert.from.toISOString(),
      })
    ).then(
      (act) => Promise.resolve(this.awsActivityToActivity(act)),
      () =>
        Promise.reject(
          `Could not insert Activity at starttime ${insert.from.toISOString()}`
        )
    );
  }

  async update(activity: Activity): Promise<void> {
    const act = await DataStore.query(AwsActivity, activity.id);
    if (!act) {
      return Promise.reject(
        `Could not update Activity from ${activity.from.toISOString()}`
      );
    }
    return DataStore.save(
      AwsActivity.copyOf(act, (updated) => {
        updated.categoryID = activity.categoryID;
        updated.from = activity.from.toISOString();
      })
    ).then(
      () => Promise.resolve(),
      () =>
        Promise.reject(
          `Could not update Activity from ${activity.from.toISOString()}`
        )
    );
  }

  async delete(activity: Activity): Promise<void> {
    const act = await DataStore.query(AwsActivity, activity.id);
    if (!act) {
      return Promise.reject(
        `Could not delete Activity from ${activity.from.toISOString()}`
      );
    }
    return DataStore.delete(act).then(
      () => Promise.resolve(),
      () =>
        Promise.reject(
          `Could not delete Activity from ${activity.from.toISOString()}`
        )
    );
  }

  getAll(): Promise<Activity[]> {
    return DataStore.query(AwsActivity, Predicates.ALL, {
      sort: (q) => q.from(SortDirection.ASCENDING),
    }).then(
      (acts) => acts.map(act => this.awsActivityToActivity(act)),
      () => Promise.reject('Could not query activities.')
    );
  }

  getById(id: string): Promise<Activity> {
    return DataStore.query(AwsActivity, id).then(
      (act) => {
        if (!act || !act.from) {
          return Promise.reject(`Could not get activity with id ${id}`);
        }
        return Promise.resolve(this.awsActivityToActivity(act));
      },
      () => Promise.reject(`Could not get activity with id ${id}`)
    );
  }

  getByCategory(category: Category): Promise<Activity[]> {
    return DataStore.query(
      AwsActivity,
      (q) => q.categoryID('eq', category.id),
      { sort: (q) => q.from(SortDirection.ASCENDING) }
    ).then(
      (acts) => acts.map((act) => this.awsActivityToActivity(act)),
      () =>
        Promise.reject(
          `Could not query activities for category ${category.name}.`
        )
    );
  }

  getBetween(from: Date, to: Date, category?: Category): Promise<Activity[]> {
    return DataStore.query(
      AwsActivity,
      (q) => q.from('ge', from.toISOString()).from('lt', to.toISOString()),
      { sort: (q) => q.from(SortDirection.ASCENDING) }
    ).then(
      (acts) => {
        let activities = acts.map((act) =>
          this.awsActivityToActivity(act)
        );
        if (category) {
          activities = activities.filter(
            (act) => act.categoryID === category.id
          );
        }
        return activities;
      },
      () =>
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

  activityCreated(val: any, owner: AwsActivityService): void {
    if (val.element) {
      const date: Date = new Date(Date.parse(val.element.from));
      owner.notifyObservers(date);
    }
  }

  private awsActivityToActivity(act: AwsActivity): Activity {
    return {
      categoryID: act.categoryID,
      from: new Date(Date.parse(act.from)),
      id: act.id,
    };
  }

  notifyObservers(affected: Date): void {
    this.activitySubjects.forEach((item) => {
      if (item.from && item.from < affected && item.to && item.to > affected) {
        this.getBetween(item.from, item.to).then((result) =>
          item.subscribeable.next(result)
        );
      } else if (!item.from && !item.to) {
        this.getAll().then((result) => item.subscribeable.next(result));
      }
    });
  }
}
