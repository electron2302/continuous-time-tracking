import { Category } from '../../models';
import { StatisticType } from '../interfaces/statistics';

export interface CreateCategoryInput {
  name: string;
  color: string;
  reminderInterval: number;
  excludeFromStatistics: StatisticType[];
}

export interface CategoryService {
  /**
   * Create a new category.
   * 
   * @param input, the category to create.
   */
  create(input: CreateCategoryInput): Promise<void>;

  /**
   * Get an existing category by an id.
   * 
   * @param id, the id of the category.
   */
  getById(id: string): Promise<Category>;

  /**
   * Get all categories.
   */
  getAll(): Promise<Category[]>;

  /**
   * Update an existing category.
   * 
   * @param category, the category to update.
   */
  update(category: Category): Promise<void>;
}
