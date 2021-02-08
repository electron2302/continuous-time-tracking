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
  /**
   * Version number is necessary to update the data in the database.
   * For the update, the version in the database has to be specified.
   */
  version: number;
}
