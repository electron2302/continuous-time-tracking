/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateTaskInput = {
  id?: string | null;
  title: string;
  description?: string | null;
  status?: string | null;
  _version?: number | null;
};

export type ModelTaskConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  status?: ModelStringInput | null;
  and?: Array<ModelTaskConditionInput | null> | null;
  or?: Array<ModelTaskConditionInput | null> | null;
  not?: ModelTaskConditionInput | null;
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

export type UpdateTaskInput = {
  id: string;
  title?: string | null;
  description?: string | null;
  status?: string | null;
  _version?: number | null;
};

export type DeleteTaskInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreatePrivateNoteInput = {
  id?: string | null;
  content: string;
  _version?: number | null;
};

export type ModelPrivateNoteConditionInput = {
  content?: ModelStringInput | null;
  and?: Array<ModelPrivateNoteConditionInput | null> | null;
  or?: Array<ModelPrivateNoteConditionInput | null> | null;
  not?: ModelPrivateNoteConditionInput | null;
};

export type UpdatePrivateNoteInput = {
  id: string;
  content?: string | null;
  _version?: number | null;
};

export type DeletePrivateNoteInput = {
  id?: string | null;
  _version?: number | null;
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  status?: ModelStringInput | null;
  and?: Array<ModelTaskFilterInput | null> | null;
  or?: Array<ModelTaskFilterInput | null> | null;
  not?: ModelTaskFilterInput | null;
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

export type ModelPrivateNoteFilterInput = {
  id?: ModelIDInput | null;
  content?: ModelStringInput | null;
  and?: Array<ModelPrivateNoteFilterInput | null> | null;
  or?: Array<ModelPrivateNoteFilterInput | null> | null;
  not?: ModelPrivateNoteFilterInput | null;
};

export type CreateTaskMutation = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTaskMutation = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type DeleteTaskMutation = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type CreatePrivateNoteMutation = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type UpdatePrivateNoteMutation = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type DeletePrivateNoteMutation = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type SyncTasksQuery = {
  __typename: "ModelTaskConnection";
  items: Array<{
    __typename: "Task";
    id: string;
    title: string;
    description: string | null;
    status: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetTaskQuery = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type ListTasksQuery = {
  __typename: "ModelTaskConnection";
  items: Array<{
    __typename: "Task";
    id: string;
    title: string;
    description: string | null;
    status: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncPrivateNotesQuery = {
  __typename: "ModelPrivateNoteConnection";
  items: Array<{
    __typename: "PrivateNote";
    id: string;
    content: string;
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

export type GetPrivateNoteQuery = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type ListPrivateNotesQuery = {
  __typename: "ModelPrivateNoteConnection";
  items: Array<{
    __typename: "PrivateNote";
    id: string;
    content: string;
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

export type OnCreateTaskSubscription = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateTaskSubscription = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteTaskSubscription = {
  __typename: "Task";
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type OnCreatePrivateNoteSubscription = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnUpdatePrivateNoteSubscription = {
  __typename: "PrivateNote";
  id: string;
  content: string;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
};

export type OnDeletePrivateNoteSubscription = {
  __typename: "PrivateNote";
  id: string;
  content: string;
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
  async CreateTask(
    input: CreateTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<CreateTaskMutation> {
    const statement = `mutation CreateTask($input: CreateTaskInput!, $condition: ModelTaskConditionInput) {
        createTask(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
    return <CreateTaskMutation>response.data.createTask;
  }
  async UpdateTask(
    input: UpdateTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<UpdateTaskMutation> {
    const statement = `mutation UpdateTask($input: UpdateTaskInput!, $condition: ModelTaskConditionInput) {
        updateTask(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
    return <UpdateTaskMutation>response.data.updateTask;
  }
  async DeleteTask(
    input: DeleteTaskInput,
    condition?: ModelTaskConditionInput
  ): Promise<DeleteTaskMutation> {
    const statement = `mutation DeleteTask($input: DeleteTaskInput!, $condition: ModelTaskConditionInput) {
        deleteTask(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
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
    return <DeleteTaskMutation>response.data.deleteTask;
  }
  async CreatePrivateNote(
    input: CreatePrivateNoteInput,
    condition?: ModelPrivateNoteConditionInput
  ): Promise<CreatePrivateNoteMutation> {
    const statement = `mutation CreatePrivateNote($input: CreatePrivateNoteInput!, $condition: ModelPrivateNoteConditionInput) {
        createPrivateNote(input: $input, condition: $condition) {
          __typename
          id
          content
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
    return <CreatePrivateNoteMutation>response.data.createPrivateNote;
  }
  async UpdatePrivateNote(
    input: UpdatePrivateNoteInput,
    condition?: ModelPrivateNoteConditionInput
  ): Promise<UpdatePrivateNoteMutation> {
    const statement = `mutation UpdatePrivateNote($input: UpdatePrivateNoteInput!, $condition: ModelPrivateNoteConditionInput) {
        updatePrivateNote(input: $input, condition: $condition) {
          __typename
          id
          content
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
    return <UpdatePrivateNoteMutation>response.data.updatePrivateNote;
  }
  async DeletePrivateNote(
    input: DeletePrivateNoteInput,
    condition?: ModelPrivateNoteConditionInput
  ): Promise<DeletePrivateNoteMutation> {
    const statement = `mutation DeletePrivateNote($input: DeletePrivateNoteInput!, $condition: ModelPrivateNoteConditionInput) {
        deletePrivateNote(input: $input, condition: $condition) {
          __typename
          id
          content
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
    return <DeletePrivateNoteMutation>response.data.deletePrivateNote;
  }
  async SyncTasks(
    filter?: ModelTaskFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncTasksQuery> {
    const statement = `query SyncTasks($filter: ModelTaskFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncTasks(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            title
            description
            status
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
    return <SyncTasksQuery>response.data.syncTasks;
  }
  async GetTask(id: string): Promise<GetTaskQuery> {
    const statement = `query GetTask($id: ID!) {
        getTask(id: $id) {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTaskQuery>response.data.getTask;
  }
  async ListTasks(
    filter?: ModelTaskFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTasksQuery> {
    const statement = `query ListTasks($filter: ModelTaskFilterInput, $limit: Int, $nextToken: String) {
        listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            description
            status
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
    return <ListTasksQuery>response.data.listTasks;
  }
  async SyncPrivateNotes(
    filter?: ModelPrivateNoteFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncPrivateNotesQuery> {
    const statement = `query SyncPrivateNotes($filter: ModelPrivateNoteFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncPrivateNotes(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            content
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
    return <SyncPrivateNotesQuery>response.data.syncPrivateNotes;
  }
  async GetPrivateNote(id: string): Promise<GetPrivateNoteQuery> {
    const statement = `query GetPrivateNote($id: ID!) {
        getPrivateNote(id: $id) {
          __typename
          id
          content
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
    return <GetPrivateNoteQuery>response.data.getPrivateNote;
  }
  async ListPrivateNotes(
    filter?: ModelPrivateNoteFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPrivateNotesQuery> {
    const statement = `query ListPrivateNotes($filter: ModelPrivateNoteFilterInput, $limit: Int, $nextToken: String) {
        listPrivateNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            content
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
    return <ListPrivateNotesQuery>response.data.listPrivateNotes;
  }
  OnCreateTaskListener: Observable<
    SubscriptionResponse<OnCreateTaskSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateTask {
        onCreateTask {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateTaskSubscription>>;

  OnUpdateTaskListener: Observable<
    SubscriptionResponse<OnUpdateTaskSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTask {
        onUpdateTask {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateTaskSubscription>>;

  OnDeleteTaskListener: Observable<
    SubscriptionResponse<OnDeleteTaskSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTask {
        onDeleteTask {
          __typename
          id
          title
          description
          status
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteTaskSubscription>>;

  OnCreatePrivateNoteListener: Observable<
    SubscriptionResponse<OnCreatePrivateNoteSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePrivateNote($owner: String!) {
        onCreatePrivateNote(owner: $owner) {
          __typename
          id
          content
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreatePrivateNoteSubscription>>;

  OnUpdatePrivateNoteListener: Observable<
    SubscriptionResponse<OnUpdatePrivateNoteSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePrivateNote($owner: String!) {
        onUpdatePrivateNote(owner: $owner) {
          __typename
          id
          content
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdatePrivateNoteSubscription>>;

  OnDeletePrivateNoteListener: Observable<
    SubscriptionResponse<OnDeletePrivateNoteSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePrivateNote($owner: String!) {
        onDeletePrivateNote(owner: $owner) {
          __typename
          id
          content
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeletePrivateNoteSubscription>>;
}
