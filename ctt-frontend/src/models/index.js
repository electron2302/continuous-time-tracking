// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const StatisticType = {
  "RELATIVE_TIME": "RelativeTime",
  "ABSOLUTE_TIME": "AbsoluteTime"
};

const { Category, Activity } = initSchema(schema);

export {
  Category,
  Activity,
  StatisticType
};