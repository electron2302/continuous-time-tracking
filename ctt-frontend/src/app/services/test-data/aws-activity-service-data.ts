/* eslint-disable @typescript-eslint/naming-convention */
import { Activity } from '../../interfaces/activity';
import { Category } from '../../interfaces/category';
import { CreateActivityInput } from '../activity.service';
import {
  CreateActivityMutation,
  UpdateActivityMutation,
  ListActivitysQuery,
  GetActivityQuery,
} from '../API.service';

export const activityResult: Activity = {
  categoryID: '0',
  from: new Date(2021, 2, 8, 12, 0),
  id: '1',
  version: 1,
};

export const secondActivity: Activity = {
  categoryID: '3',
  from: new Date(2021, 2, 9, 1, 0),
  id: '2',
  version: 2,
};

export const createInput: CreateActivityInput = {
  categoryID: '0',
  from: new Date(2021, 2, 8, 12, 0),
};

export const createResult: CreateActivityMutation = {
  categoryID: '0',
  from: new Date(2021, 2, 8, 12, 0).toISOString(),
  createdAt: new Date(2021, 2, 8, 12, 1).toISOString(),
  id: '1',
  owner: null,
  updatedAt: '',
  __typename: 'Activity',
  _deleted: null,
  _lastChangedAt: 0,
  _version: 1,
};

export const updateResult: UpdateActivityMutation = {
  categoryID: '0',
  from: new Date(2021, 2, 8, 12, 0).toISOString(),
  createdAt: new Date(2021, 2, 8, 12, 1).toISOString(),
  id: '1',
  owner: null,
  updatedAt: '',
  __typename: 'Activity',
  _deleted: null,
  _lastChangedAt: 0,
  _version: 1,
};

export const activityListEmpty: Activity[] = [];

export const activityListSingle: Activity[] = [activityResult];

export const activityListMulti: Activity[] = [activityResult, secondActivity];

export const activityApiListEmpty: ListActivitysQuery = {
  items: [],
  nextToken: null,
  startedAt: null,
  __typename: 'ModelActivityConnection',
};

export const activityApiListSingle: ListActivitysQuery = {
  items: [
    {
      __typename: 'Activity',
      _deleted: null,
      _lastChangedAt: 0,
      _version: 1,
      categoryID: '0',
      createdAt: '',
      from: new Date(2021, 2, 8, 12, 0).toISOString(),
      id: '1',
      owner: null,
      updatedAt: '',
    },
  ],
  nextToken: null,
  startedAt: null,
  __typename: 'ModelActivityConnection',
};

export const activityApiListMulti: ListActivitysQuery = {
  items: [
    {
      __typename: 'Activity',
      _deleted: null,
      _lastChangedAt: 0,
      _version: 1,
      categoryID: '0',
      createdAt: '',
      from: new Date(2021, 2, 8, 12, 0).toISOString(),
      id: '1',
      owner: null,
      updatedAt: '',
    },{
      __typename: 'Activity',
      _deleted: null,
      _lastChangedAt: 0,
      _version: 2,
      categoryID: '3',
      createdAt: '',
      from: new Date(2021, 2, 9, 1, 0).toISOString(),
      id: '2',
      owner: null,
      updatedAt: '',
    },
  ],
  nextToken: null,
  startedAt: null,
  __typename: 'ModelActivityConnection',
};

export const getActivity: GetActivityQuery = {
  __typename: 'Activity',
  _deleted: null,
  _lastChangedAt: 0,
  _version: 1,
  categoryID: '0',
  createdAt: '',
  from: new Date(2021, 2, 8, 12, 0).toISOString(),
  id: '1',
  owner: null,
  updatedAt: '',
};

export const filterCategroy: Category = {
  color: '#000000',
  excludeFromStatistics: [],
  id: '0',
  name: 'TestCat',
  reminderInterval: -1,
  version: 1,
};

export const fromDate: Date = new Date(2021, 2, 1, 1, 0);
export const toDate: Date = new Date(2021, 2, 9, 13, 0);
