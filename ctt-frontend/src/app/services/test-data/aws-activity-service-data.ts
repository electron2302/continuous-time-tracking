/* eslint-disable @typescript-eslint/naming-convention */
import { Activity } from '../../interfaces/activity';
import { CreateActivityInput } from '../activity.service';
import { CreateActivityMutation as APICreateResult } from '../API.service';

export const activityResult: Activity = {
  categoryID: '0',
  from: new Date(2021, 2, 8, 12, 0),
  id: '1',
};

export const createInput: CreateActivityInput = {
 categoryID: '0',
 from: new Date(2021, 2, 8, 12, 0),
};

export const createResult: APICreateResult = {
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
