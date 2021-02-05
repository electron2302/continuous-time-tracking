/* eslint-disable @typescript-eslint/naming-convention */
import {
  CreateCategoryMutation,
  GetCategoryQuery,
  StatisticType as APIStatisticType,
} from '../API.service';
import { CreateCategoryInput } from '../category.service';
import { Category } from '../../interfaces/category';
import { StatisticType } from 'src/app/interfaces/statistics';

export const categoryInput: CreateCategoryInput = {
  color: '#00000',
  name: 'TestCat',
  excludeFromStatistics: [],
  reminderInterval: 10,
};

export const createMutation: CreateCategoryMutation = {
  color: '#000000',
  name: 'TestCat',
  excludeFromStatistics: [],
  reminderInterval: 10,
  activities: null,
  __typename: 'Category',
  id: '1',
  createdAt: '',
  owner: null,
  _deleted: false,
  _lastChangedAt: 0,
  _version: 1,
  updatedAt: '',
};

export const categoryResult: Category = {
  id: '0',
  name: 'ResultCategory',
  color: '#012345',
  excludeFromStatistics: [StatisticType.absoluteTime],
  reminderInterval: 5,
};

export const queryIdResult: GetCategoryQuery = {
  id: '0',
  name: 'ResultCategory',
  color: '#012345',
  excludeFromStatistics: [APIStatisticType.AbsoluteTime],
  reminderInterval: 5,
  __typename: 'Category',
  _deleted: false,
  _lastChangedAt: 0,
  _version: 2,
  activities: null,
  createdAt: '',
  owner: null,
  updatedAt: '',
};
