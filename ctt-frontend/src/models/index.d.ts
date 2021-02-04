import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum StatisticType {
  RELATIVE_TIME = "RelativeTime",
  ABSOLUTE_TIME = "AbsoluteTime"
}



export declare class Category {
  readonly id: string;
  readonly name: string;
  readonly color: string;
  readonly reminderInterval: number;
  readonly activities?: (Activity | null)[];
  readonly excludeFromStatistics?: (StatisticType | null)[] | keyof typeof StatisticType;
  constructor(init: ModelInit<Category>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

export declare class Activity {
  readonly id: string;
  readonly categoryID: string;
  readonly from: string;
  constructor(init: ModelInit<Activity>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity>) => MutableModel<Activity> | void): Activity;
}