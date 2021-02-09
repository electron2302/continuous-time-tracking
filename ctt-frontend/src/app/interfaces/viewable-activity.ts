import {
  differenceInMs,
  formatDuration,
  isToday,
  nextDayMidnight,
} from '../helper/time';
import { Activity } from './activity';
import { Category } from './category';

export interface ViewableActivity {
  color: string;
  name: string;
  from: Date;
  duration: string;
}

export const toViewableActivities = (
  categoryById: Map<string, Category>,
  activities: Activity[]
) => {
  const result: ViewableActivity[] = [];

  activities.forEach((a, i) => {
    const category = categoryById.get(a.categoryID);
    if (!category) {
      console.error(`No category found with id ${a.categoryID}`);
      return;
    }
    let durationMs;
    if (i < activities.length - 1) {
      durationMs = differenceInMs(activities[i + 1].from, a.from);
    } else {
      if (isToday(a.from)) {
        durationMs = -1;
      } else {
        durationMs = differenceInMs(nextDayMidnight(a.from), a.from);
      }
    }
    result.push({
      color: category.color,
      from: a.from,
      name: category.name,
      duration: durationMs === -1 ? '' : formatDuration(durationMs),
    });
  });
  return result;
};
