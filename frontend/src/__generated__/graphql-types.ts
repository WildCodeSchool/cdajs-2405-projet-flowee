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

/** Client status */
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
  deliveryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  perimeter?: Maybe<Scalars['String']['output']>;
  reviewTimes?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tasks: Array<Task>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createClient: Client;
  createCompagny: Compagny;
  createDeliverable: Deliverable;
  createProject: Project;
  createTask: Task;
  deleteCompagny: Scalars['Boolean']['output'];
  deleteDeliverable: Scalars['Boolean']['output'];
  deleteTask: Task;
  login: Scalars['String']['output'];
  updateCompagny: Compagny;
  updateDeliverable: Deliverable;
  updateTask: Task;
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


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients: Array<{ __typename?: 'Client', id: string, clientName?: string | null, status?: ClientStatus | null, account?: { __typename?: 'Account', email: string, role: string } | null }> };

export type GetAllDeliverablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDeliverablesQuery = { __typename?: 'Query', getAllDeliverables: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, deliveryDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null }> }> };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null }> };

export type GetProjectsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsByUserQuery = { __typename?: 'Query', getProjectsByUser: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: string | null, client: { __typename?: 'Client', id: string, clientName?: string | null } }> };


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
      role
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
    deliveryDate
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