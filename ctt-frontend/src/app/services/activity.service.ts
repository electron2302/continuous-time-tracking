import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity';
import { Category } from '../interfaces/category';

export interface CreateActivityInput {
  categoryID: string;
  from: Date;
}

export abstract class ActivityService {
  /**
   * Create a new activity.
   *
   * @param input, the activity to create.
   */
  abstract create(input: CreateActivityInput): Promise<Activity>;

  /**
   * Insert an activity.
   * There shouldn't be an activity
   * with the same from value.
   *
   * @param insert, the activity to insert.
   */
  abstract insert(insert: CreateActivityInput): Promise<Activity>;

  /**
   * Update an existing activity
   *
   * @param activity, the activity to update.
   */
  abstract update(activity: Activity): Promise<void>;

  /**
   * Deletes an existing activity.
   *
   * @param activity, the activity to delete.
   */
  abstract delete(activity: Activity): Promise<void>;

  /**
   * Get all activities.
   */
  abstract getAll(): Promise<Activity[]>;

  /**
   * Get an existing activity by an id.
   *
   * @param id, the id of the activity.
   */
  abstract getById(id: string): Promise<Activity>;

  /**
   * Get all activities relating a category.
   *
   * @param category, the category to match.
   */
  abstract getByCategory(category: Category): Promise<Activity[]>;

  /**
   * Get all activities between from and to.
   * And filter the activities relating to the category,
   * if it is provided.
   *
   * @param from, the included start time.
   * @param to, the excluded end time.
   * @param category, the optional category, to filter the activities.
   */
  abstract getBetween(
    from: Date,
    to: Date,
    category?: Category
  ): Promise<Activity[]>;

  /**
   * Subscribe to all activities between from and to.
   * If neither from nor to is provided,
   * then it subscrites to all activities of the current day.
   *
   * @param from, the optional and included start time.
   * @param to, the optional and excluded end time
   */
  abstract subscribeToActivities(
    from?: Date,
    to?: Date
  ): Observable<Activity[]>;
}
