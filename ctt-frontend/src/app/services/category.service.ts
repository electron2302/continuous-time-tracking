import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { StatisticType } from '../interfaces/statistics';

export interface CreateCategoryInput {
  name: string;
  color: string;
  reminderInterval: number;
  excludeFromStatistics: StatisticType[];
}

export abstract class CategoryService {
  /**
   * Create a new category.
   *
   * @param input, the category to create.
   */
  abstract create(input: CreateCategoryInput): Promise<Category>;

  /**
   * Get an existing category by an id.
   *
   * @param id, the id of the category.
   */
  abstract getById(id: string): Promise<Category>;

  /**
   * Get all categories.
   */
  abstract getAll(): Promise<Category[]>;

  /**
   * Update an existing category.
   *
   * @param category, the category to update.
   */
  abstract update(category: Category): Promise<void>;

  /**
   * Provides all categories as an observable that emits an array
   * of all categories when a change happens.
   */
  abstract allAsObservable(): Observable<Category[]>;
}
