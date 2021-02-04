// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Activity } = initSchema(schema);

export {
  Category,
  Activity
};