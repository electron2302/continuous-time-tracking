/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateCategoryInput = {
  id?: string | null;
  name: string;
  color: string;
  reminderInterval: number;
  _version?: number | null;
};

export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null;
  color?: ModelStringInput | null;
  reminderInterval?: ModelIntInput | null;
  and?: Array<ModelCategoryConditionInput | null> | null;
  or?: Array<ModelCategoryConditionInput | null> | null;
  not?: ModelCategoryConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateCategoryInput = {
  id: string;
  name?: string | null;
  color?: string | null;
  reminderInterval?: number | null;
  _version?: number | null;
};

export type DeleteCategoryInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateActivityInput = {
  id?: string | null;
  categoryID: string;
  from: string;
  _version?: number | null;
};

export type ModelActivityConditionInput = {
  categoryID?: ModelIDInput | null;
  from?: ModelStringInput | null;
  and?: Array<ModelActivityConditionInput | null> | null;
  or?: Array<ModelActivityConditionInput | null> | null;
  not?: ModelActivityConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateActivityInput = {
  id: string;
  categoryID?: string | null;
  from?: string | null;
  _version?: number | null;
};

export type DeleteActivityInput = {
  id?: string | null;
  _version?: number | null;
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  color?: ModelStringInput | null;
  reminderInterval?: ModelIntInput | null;
  and?: Array<ModelCategoryFilterInput | null> | null;
  or?: Array<ModelCategoryFilterInput | null> | null;
  not?: ModelCategoryFilterInput | null;
};

export type ModelActivityFilterInput = {
  id?: ModelIDInput | null;
  categoryID?: ModelIDInput | null;
  from?: ModelStringInput | null;
  and?: Array<ModelActivityFilterInput | null> | null;
  or?: Array<ModelActivityFilterInput | null> | null;
  not?: ModelActivityFilterInput | null;
};

export type CreateCategoryMutation = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateCategoryMutation = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteCategoryMutation = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type CreateActivityMutation = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdateActivityMutation = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeleteActivityMutation = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type SyncCategoriesQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
    __typename: "Category";
    id: string;
    name: string;
    color: string;
    reminderInterval: number;
    activities: {
      __typename: "ModelActivityConnection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetCategoryQuery = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListCategorysQuery = {
  __typename: "ModelCategoryConnection";
  items: Array<{
    __typename: "Category";
    id: string;
    name: string;
    color: string;
    reminderInterval: number;
    activities: {
      __typename: "ModelActivityConnection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncActivitiesQuery = {
  __typename: "ModelActivityConnection";
  items: Array<{
    __typename: "Activity";
    id: string;
    categoryID: string;
    from: string;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetActivityQuery = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListActivitysQuery = {
  __typename: "ModelActivityConnection";
  items: Array<{
    __typename: "Activity";
    id: string;
    categoryID: string;
    from: string;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type OnCreateCategorySubscription = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateCategorySubscription = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteCategorySubscription = {
  __typename: "Category";
  id: string;
  name: string;
  color: string;
  reminderInterval: number;
  activities: {
    __typename: "ModelActivityConnection";
    items: Array<{
      __typename: "Activity";
      id: string;
      categoryID: string;
      from: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnCreateActivitySubscription = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdateActivitySubscription = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeleteActivitySubscription = {
  __typename: "Activity";
  id: string;
  categoryID: string;
  from: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateCategory(
    input: CreateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<CreateCategoryMutation> {
    const statement = `mutation CreateCategory($input: CreateCategoryInput!, $condition: ModelCategoryConditionInput) {
        createCategory(input: $input, condition: $condition) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCategoryMutation>response.data.createCategory;
  }
  async UpdateCategory(
    input: UpdateCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<UpdateCategoryMutation> {
    const statement = `mutation UpdateCategory($input: UpdateCategoryInput!, $condition: ModelCategoryConditionInput) {
        updateCategory(input: $input, condition: $condition) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCategoryMutation>response.data.updateCategory;
  }
  async DeleteCategory(
    input: DeleteCategoryInput,
    condition?: ModelCategoryConditionInput
  ): Promise<DeleteCategoryMutation> {
    const statement = `mutation DeleteCategory($input: DeleteCategoryInput!, $condition: ModelCategoryConditionInput) {
        deleteCategory(input: $input, condition: $condition) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCategoryMutation>response.data.deleteCategory;
  }
  async CreateActivity(
    input: CreateActivityInput,
    condition?: ModelActivityConditionInput
  ): Promise<CreateActivityMutation> {
    const statement = `mutation CreateActivity($input: CreateActivityInput!, $condition: ModelActivityConditionInput) {
        createActivity(input: $input, condition: $condition) {
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateActivityMutation>response.data.createActivity;
  }
  async UpdateActivity(
    input: UpdateActivityInput,
    condition?: ModelActivityConditionInput
  ): Promise<UpdateActivityMutation> {
    const statement = `mutation UpdateActivity($input: UpdateActivityInput!, $condition: ModelActivityConditionInput) {
        updateActivity(input: $input, condition: $condition) {
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateActivityMutation>response.data.updateActivity;
  }
  async DeleteActivity(
    input: DeleteActivityInput,
    condition?: ModelActivityConditionInput
  ): Promise<DeleteActivityMutation> {
    const statement = `mutation DeleteActivity($input: DeleteActivityInput!, $condition: ModelActivityConditionInput) {
        deleteActivity(input: $input, condition: $condition) {
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteActivityMutation>response.data.deleteActivity;
  }
  async SyncCategories(
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncCategoriesQuery> {
    const statement = `query SyncCategories($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncCategories(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            name
            color
            reminderInterval
            activities {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncCategoriesQuery>response.data.syncCategories;
  }
  async GetCategory(id: string): Promise<GetCategoryQuery> {
    const statement = `query GetCategory($id: ID!) {
        getCategory(id: $id) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCategoryQuery>response.data.getCategory;
  }
  async ListCategorys(
    filter?: ModelCategoryFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCategorysQuery> {
    const statement = `query ListCategorys($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
        listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            color
            reminderInterval
            activities {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCategorysQuery>response.data.listCategorys;
  }
  async SyncActivities(
    filter?: ModelActivityFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncActivitiesQuery> {
    const statement = `query SyncActivities($filter: ModelActivityFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncActivities(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
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
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncActivitiesQuery>response.data.syncActivities;
  }
  async GetActivity(id: string): Promise<GetActivityQuery> {
    const statement = `query GetActivity($id: ID!) {
        getActivity(id: $id) {
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
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetActivityQuery>response.data.getActivity;
  }
  async ListActivitys(
    filter?: ModelActivityFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListActivitysQuery> {
    const statement = `query ListActivitys($filter: ModelActivityFilterInput, $limit: Int, $nextToken: String) {
        listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
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
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListActivitysQuery>response.data.listActivitys;
  }
  OnCreateCategoryListener: Observable<
    SubscriptionResponse<OnCreateCategorySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCategory($owner: String!) {
        onCreateCategory(owner: $owner) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateCategorySubscription>>;

  OnUpdateCategoryListener: Observable<
    SubscriptionResponse<OnUpdateCategorySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCategory($owner: String!) {
        onUpdateCategory(owner: $owner) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateCategorySubscription>>;

  OnDeleteCategoryListener: Observable<
    SubscriptionResponse<OnDeleteCategorySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCategory($owner: String!) {
        onDeleteCategory(owner: $owner) {
          __typename
          id
          name
          color
          reminderInterval
          activities {
            __typename
            items {
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
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCategorySubscription>>;

  OnCreateActivityListener: Observable<
    SubscriptionResponse<OnCreateActivitySubscription>
  > = API.graphql(
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
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateActivitySubscription>>;

  OnUpdateActivityListener: Observable<
    SubscriptionResponse<OnUpdateActivitySubscription>
  > = API.graphql(
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
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateActivitySubscription>>;

  OnDeleteActivityListener: Observable<
    SubscriptionResponse<OnDeleteActivitySubscription>
  > = API.graphql(
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
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteActivitySubscription>>;
}
