import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Observable as ZenObs } from 'zen-observable-ts';
import {
  SubscriptionResponse,
  OnCreateActivitySubscription,
  OnDeleteActivitySubscription,
  OnUpdateActivitySubscription,
} from '../services/API.service';

export class ChangeListener {
  constructor() {}

  async getCreateActivityListener(): Promise<
    ZenObs<SubscriptionResponse<OnCreateActivitySubscription>>
  > {
    const o = await this.getUsername();
    return API.graphql(
      graphqlOperation(
        `subscription OnCreateActivity($owner: String!) {
            onCreateActivity(owner: $owner) {
              __typename
              id
              categoryID
              from
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              owner
            }
          }`,
        { owner: o }
      )
    ) as ZenObs<SubscriptionResponse<OnCreateActivitySubscription>>;
  }

  async getUpdateActivityListener(): Promise<
    ZenObs<SubscriptionResponse<OnUpdateActivitySubscription>>
  > {
    return API.graphql(
      graphqlOperation(
        `subscription OnUpdateActivity($owner: String!) {
        onUpdateActivity(owner: $owner) {
          __typename
          id
          categoryID
          from
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`,
        { owner: await this.getUsername() }
      )
    ) as ZenObs<SubscriptionResponse<OnUpdateActivitySubscription>>;
  }

  async getDeleteActivityListener(): Promise<
    ZenObs<SubscriptionResponse<OnDeleteActivitySubscription>>
  > {
    return API.graphql(
      graphqlOperation(
        `subscription OnDeleteActivity($owner: String!) {
        onDeleteActivity(owner: $owner) {
          __typename
          id
          categoryID
          from
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`,
        { owner: this.getUsername() }
      )
    ) as ZenObs<SubscriptionResponse<OnDeleteActivitySubscription>>;
  }

  private async getUsername(): Promise<string> {
    let username = '';
    await Auth.currentUserInfo().then(
      (user: any) => (username = user.username),
      () => username = ''
    );
    return Promise.resolve(username);
  }
}
