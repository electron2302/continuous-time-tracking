import { Subject } from 'rxjs';
import { Activity } from '../interfaces/activity';

export class DateSubscriber {
  from?: Date;
  to?: Date;
  subscribeable: Subject<Activity[]>;

  constructor(subscribable: Subject<Activity[]>, from?: Date, to?: Date) {
    this.from = from;
    this.to = to;
    this.subscribeable = subscribable;
  }
}
