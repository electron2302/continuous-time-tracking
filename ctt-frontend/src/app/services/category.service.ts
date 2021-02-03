import { Category } from '../../models';
import { StatisticType } from '../interfaces/statistics';

export interface CreateCategoryInput {
  name: string;
  color: string;
  reminderInterval: number;
  excludeFromStatistics: StatisticType[];
}

export interface CategoryService {
  create(input: CreateCategoryInput): Promise<void>;
  getById(id: string): Promise<Category>;
  getAll(): Promise<Category[]>;
  update(category: Category): Promise<void>;
}
