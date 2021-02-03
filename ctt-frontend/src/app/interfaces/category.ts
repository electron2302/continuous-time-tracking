import { StatisticType } from './statistics';

interface Category {
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
