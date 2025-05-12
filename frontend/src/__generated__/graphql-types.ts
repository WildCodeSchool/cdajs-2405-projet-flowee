import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  companyUser?: Maybe<CompanyUser>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  status: AccountStatus;
};

/** Account status */
export enum AccountStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

export type Client = {
  __typename?: 'Client';
  account?: Maybe<Account>;
  clientName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status?: Maybe<ClientStatus>;
};

/** Status of client */
export enum ClientStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export type Compagny = {
  __typename?: 'Compagny';
  address?: Maybe<Scalars['String']['output']>;
  companyUsers: Array<CompanyUser>;
  contactInfo?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CompanyUser = {
  __typename?: 'CompanyUser';
  account: Account;
  company?: Maybe<Compagny>;
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
};

export type CreateProjectInput = {
  clientEmail: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  projectName: Scalars['String']['input'];
};

export type Deliverable = {
  __typename?: 'Deliverable';
  createdAt?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  perimeter?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  reviewTimes?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Task>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: Scalars['Boolean']['output'];
  archiveClient: Client;
  createAccount: Account;
  createClient: Client;
  createCompagny: Compagny;
  createDeliverable: Deliverable;
  createProject: Project;
  createTask: Task;
  deleteClient: Scalars['Boolean']['output'];
  deleteCompagny: Scalars['Boolean']['output'];
  deleteDeliverable: Scalars['Boolean']['output'];
  deleteTask: Task;
  login: Scalars['String']['output'];
  updateClient: Client;
  updateCompagny: Compagny;
  updateDeliverable: Deliverable;
  updateTask: Task;
};


export type MutationActivateAccountArgs = {
  token: Scalars['String']['input'];
};


export type MutationArchiveClientArgs = {
  id: Scalars['Float']['input'];
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationCreateClientArgs = {
  Name: Scalars['String']['input'];
  accountId: Scalars['Float']['input'];
};


export type MutationCreateCompagnyArgs = {
  address: Scalars['String']['input'];
  contactInfo: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateDeliverableArgs = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deliveryDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  perimeter?: InputMaybe<Scalars['String']['input']>;
  reviewTimes?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProjectArgs = {
  newProject: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCompagnyArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteDeliverableArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateClientArgs = {
  id: Scalars['Float']['input'];
  newEmail?: InputMaybe<Scalars['String']['input']>;
  newName?: InputMaybe<Scalars['String']['input']>;
  newStatus?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCompagnyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDeliverableArgs = {
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  perimeter?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTaskArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  client: Client;
  companyUser?: Maybe<CompanyUser>;
  companyUserId: Scalars['Float']['output'];
  deliverables?: Maybe<Array<Deliverable>>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  projectName: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAccountById?: Maybe<Account>;
  getAllAccounts: Array<Account>;
  getAllClients: Array<Client>;
  getAllCompanies: Array<Compagny>;
  getAllDeliverables: Array<Deliverable>;
  getAllProjects: Array<Project>;
  getAllTasks: Array<Task>;
  getClientById?: Maybe<Client>;
  getDeliverable?: Maybe<Deliverable>;
  getProjectById?: Maybe<Project>;
  getProjectsByName?: Maybe<Array<Project>>;
  getProjectsByUser: Array<Project>;
  getTask?: Maybe<Task>;
  getTrackerStats: TrackerStats;
  me?: Maybe<Account>;
};


export type QueryGetAccountByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetClientByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetDeliverableArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetProjectsByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetTaskArgs = {
  id: Scalars['Float']['input'];
};

export type Task = {
  __typename?: 'Task';
  deliverable?: Maybe<Deliverable>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type TrackerStats = {
  __typename?: 'TrackerStats';
  approvedDeliverables?: Maybe<Scalars['Float']['output']>;
  lateProjects?: Maybe<Scalars['Float']['output']>;
  needReview?: Maybe<Scalars['Float']['output']>;
};

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ActivateAccountMutation = { __typename?: 'Mutation', activateAccount: boolean };

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: boolean };

export type ArchiveClientMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ArchiveClientMutation = { __typename?: 'Mutation', archiveClient: { __typename?: 'Client', id: string, clientName?: string | null, status?: ClientStatus | null } };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  newName?: InputMaybe<Scalars['String']['input']>;
  newEmail?: InputMaybe<Scalars['String']['input']>;
  newStatus?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string, clientName?: string | null, status?: ClientStatus | null, account?: { __typename?: 'Account', email: string } | null } };

export type CreateProjectMutationVariables = Exact<{
  newProject: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients: Array<{ __typename?: 'Client', id: string, clientName?: string | null, status?: ClientStatus | null, account?: { __typename?: 'Account', email: string } | null }> };

export type GetAllDeliverablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDeliverablesQuery = { __typename?: 'Query', getAllDeliverables: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null }> | null }> };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null }> };

export type GetProjectsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsByUserQuery = { __typename?: 'Query', getProjectsByUser: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null, client: { __typename?: 'Client', id: string, clientName?: string | null }, deliverables?: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> | null }> | null }> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById?: { __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null, client: { __typename?: 'Client', id: string, clientName?: string | null }, deliverables?: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> | null }> | null } | null };

export type GetTrackerStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrackerStatsQuery = { __typename?: 'Query', getTrackerStats: { __typename?: 'TrackerStats', approvedDeliverables?: number | null, lateProjects?: number | null, needReview?: number | null } };


export const ActivateAccountDocument = gql`
    mutation ActivateAccount($token: String!) {
  activateAccount(token: $token)
}
    `;
export type ActivateAccountMutationFn = Apollo.MutationFunction<ActivateAccountMutation, ActivateAccountMutationVariables>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<ActivateAccountMutation, ActivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateAccountMutation, ActivateAccountMutationVariables>(ActivateAccountDocument, options);
      }
export type ActivateAccountMutationHookResult = ReturnType<typeof useActivateAccountMutation>;
export type ActivateAccountMutationResult = Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<ActivateAccountMutation, ActivateAccountMutationVariables>;
export const DeleteClientDocument = gql`
    mutation DeleteClient($id: Float!) {
  deleteClient(id: $id)
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const ArchiveClientDocument = gql`
    mutation ArchiveClient($id: Float!) {
  archiveClient(id: $id) {
    id
    clientName
    status
  }
}
    `;
export type ArchiveClientMutationFn = Apollo.MutationFunction<ArchiveClientMutation, ArchiveClientMutationVariables>;

/**
 * __useArchiveClientMutation__
 *
 * To run a mutation, you first call `useArchiveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveClientMutation, { data, loading, error }] = useArchiveClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveClientMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveClientMutation, ArchiveClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveClientMutation, ArchiveClientMutationVariables>(ArchiveClientDocument, options);
      }
export type ArchiveClientMutationHookResult = ReturnType<typeof useArchiveClientMutation>;
export type ArchiveClientMutationResult = Apollo.MutationResult<ArchiveClientMutation>;
export type ArchiveClientMutationOptions = Apollo.BaseMutationOptions<ArchiveClientMutation, ArchiveClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: Float!, $newName: String, $newEmail: String, $newStatus: String) {
  updateClient(
    id: $id
    newName: $newName
    newEmail: $newEmail
    newStatus: $newStatus
  ) {
    id
    clientName
    status
    account {
      email
    }
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newName: // value for 'newName'
 *      newEmail: // value for 'newEmail'
 *      newStatus: // value for 'newStatus'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($newProject: CreateProjectInput!) {
  createProject(newProject: $newProject) {
    id
    projectName
    companyUserId
    description
    startDate
    endDate
    status
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      newProject: // value for 'newProject'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllClientsDocument = gql`
    query GetAllClients {
  getAllClients {
    id
    clientName
    account {
      email
    }
    status
  }
}
    `;

/**
 * __useGetAllClientsQuery__
 *
 * To run a query within a React component, call `useGetAllClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
      }
export function useGetAllClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export function useGetAllClientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllClientsQuery, GetAllClientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllClientsQuery, GetAllClientsQueryVariables>(GetAllClientsDocument, options);
        }
export type GetAllClientsQueryHookResult = ReturnType<typeof useGetAllClientsQuery>;
export type GetAllClientsLazyQueryHookResult = ReturnType<typeof useGetAllClientsLazyQuery>;
export type GetAllClientsSuspenseQueryHookResult = ReturnType<typeof useGetAllClientsSuspenseQuery>;
export type GetAllClientsQueryResult = Apollo.QueryResult<GetAllClientsQuery, GetAllClientsQueryVariables>;
export const GetAllDeliverablesDocument = gql`
    query GetAllDeliverables {
  getAllDeliverables {
    id
    name
    perimeter
    endDate
    status
    createdAt
    reviewTimes
    tasks {
      id
      name
      description
      status
    }
  }
}
    `;

/**
 * __useGetAllDeliverablesQuery__
 *
 * To run a query within a React component, call `useGetAllDeliverablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDeliverablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDeliverablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDeliverablesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>(GetAllDeliverablesDocument, options);
      }
export function useGetAllDeliverablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>(GetAllDeliverablesDocument, options);
        }
export function useGetAllDeliverablesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>(GetAllDeliverablesDocument, options);
        }
export type GetAllDeliverablesQueryHookResult = ReturnType<typeof useGetAllDeliverablesQuery>;
export type GetAllDeliverablesLazyQueryHookResult = ReturnType<typeof useGetAllDeliverablesLazyQuery>;
export type GetAllDeliverablesSuspenseQueryHookResult = ReturnType<typeof useGetAllDeliverablesSuspenseQuery>;
export type GetAllDeliverablesQueryResult = Apollo.QueryResult<GetAllDeliverablesQuery, GetAllDeliverablesQueryVariables>;
export const GetAllProjectsDocument = gql`
    query GetAllProjects {
  getAllProjects {
    id
    projectName
    companyUserId
    description
    startDate
    endDate
    status
  }
}
    `;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export function useGetAllProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsSuspenseQueryHookResult = ReturnType<typeof useGetAllProjectsSuspenseQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;
export const GetProjectsByUserDocument = gql`
    query GetProjectsByUser {
  getProjectsByUser {
    id
    projectName
    companyUserId
    description
    startDate
    endDate
    status
    client {
      id
      clientName
    }
    deliverables {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
      tasks {
        id
        name
        description
        status
        startDate
        endDate
      }
    }
  }
}
    `;

/**
 * __useGetProjectsByUserQuery__
 *
 * To run a query within a React component, call `useGetProjectsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
      }
export function useGetProjectsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
        }
export function useGetProjectsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>(GetProjectsByUserDocument, options);
        }
export type GetProjectsByUserQueryHookResult = ReturnType<typeof useGetProjectsByUserQuery>;
export type GetProjectsByUserLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserLazyQuery>;
export type GetProjectsByUserSuspenseQueryHookResult = ReturnType<typeof useGetProjectsByUserSuspenseQuery>;
export type GetProjectsByUserQueryResult = Apollo.QueryResult<GetProjectsByUserQuery, GetProjectsByUserQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: Float!) {
  getProjectById(id: $id) {
    id
    projectName
    companyUserId
    description
    startDate
    endDate
    status
    client {
      id
      clientName
    }
    deliverables {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
      tasks {
        id
        name
        description
        status
        startDate
        endDate
      }
    }
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables> & ({ variables: GetProjectByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export function useGetProjectByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdSuspenseQueryHookResult = ReturnType<typeof useGetProjectByIdSuspenseQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetTrackerStatsDocument = gql`
    query GetTrackerStats {
  getTrackerStats {
    approvedDeliverables
    lateProjects
    needReview
  }
}
    `;

/**
 * __useGetTrackerStatsQuery__
 *
 * To run a query within a React component, call `useGetTrackerStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackerStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackerStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTrackerStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>(GetTrackerStatsDocument, options);
      }
export function useGetTrackerStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>(GetTrackerStatsDocument, options);
        }
export function useGetTrackerStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>(GetTrackerStatsDocument, options);
        }
export type GetTrackerStatsQueryHookResult = ReturnType<typeof useGetTrackerStatsQuery>;
export type GetTrackerStatsLazyQueryHookResult = ReturnType<typeof useGetTrackerStatsLazyQuery>;
export type GetTrackerStatsSuspenseQueryHookResult = ReturnType<typeof useGetTrackerStatsSuspenseQuery>;
export type GetTrackerStatsQueryResult = Apollo.QueryResult<GetTrackerStatsQuery, GetTrackerStatsQueryVariables>;