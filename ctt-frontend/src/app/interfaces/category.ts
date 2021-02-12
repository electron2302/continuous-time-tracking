import { StatisticType } from './statistics';

export interface Category {
  id: string;
  name: string;
  /**
   * Hex color value.
   * Format: '#AAAAAA'
   */
  color: string;
  /**
   * How often a notification is sent that reminds the user if an activity is still ongoing.
   * In full minutes. Zero or negative values disable notifications.
   */
  reminderInterval: number;

  excludeFromStatistics: StatisticType[];
}

export const toCategoryMap = (categories: Category[]) => {
  const categoryById = new Map<string, Category>();
  categories.forEach((c) => {
    categoryById.set(c.id, c);
  });
  return categoryById;
};
