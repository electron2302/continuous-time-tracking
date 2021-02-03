import { Activity, Category } from '../../models';

export interface CreateActivityInput {
  categoryID: string;
  from: Date;
}

export interface ActivityService {
  create(input: CreateActivityInput): Promise<void>;
  split(existing: Activity, insert: CreateActivityInput): Promise<Activity>;
  update(activity: Activity): Promise<void>;
  delete(activity: Activity): Promise<void>;
  getAll(): Promise<Activity[]>;
  getById(id: string): Promise<Activity>;
  getByCategory(category: Category): Promise<Activity[]>;
  getBetween(from: Date, to: Date, category?: Category): Promise<Activity[]>;
}
