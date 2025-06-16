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
  client?: Maybe<Client>;
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

export type Company = {
  __typename?: 'Company';
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
  company?: Maybe<Company>;
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
};

export type CreateDeliverableInput = {
  createdAt?: InputMaybe<Scalars['String']['input']>;
  deliveryDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  perimeter?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Float']['input'];
  reviewTimes?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<DeliverableStatus>;
};

export type CreateProjectInput = {
  clientEmail: Scalars['String']['input'];
  clientName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  projectName: Scalars['String']['input'];
};

export type CreateTaskInput = {
  deliverableId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
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

/** The status of a deliverable */
export enum DeliverableStatus {
  Approved = 'APPROVED',
  Blocked = 'BLOCKED',
  InProgress = 'IN_PROGRESS',
  InReview = 'IN_REVIEW',
  Late = 'LATE',
  NotStarted = 'NOT_STARTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateAccountAndReturnToken: Scalars['String']['output'];
  archiveClient: Client;
  createAccount: Account;
  createClient: Client;
  createCompany: Company;
  createDeliverable: Deliverable;
  createProject: Project;
  createTask: Task;
  deleteClient: Scalars['Boolean']['output'];
  deleteCompany: Scalars['Boolean']['output'];
  deleteDeliverable: Scalars['Boolean']['output'];
  deleteProject: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  requestPasswordReset: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  setPasswordFromActivation: Scalars['Boolean']['output'];
  updateClient: Client;
  updateCompany: Company;
  updateDeliverable: Deliverable;
  updatePassword: Scalars['Boolean']['output'];
  updateProject: Project;
  updateTask: Task;
};


export type MutationActivateAccountAndReturnTokenArgs = {
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
  accountId: Scalars['String']['input'];
};


export type MutationCreateCompanyArgs = {
  address: Scalars['String']['input'];
  contactInfo: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateDeliverableArgs = {
  newDeliverable: CreateDeliverableInput;
};


export type MutationCreateProjectArgs = {
  newProject: CreateProjectInput;
};


export type MutationCreateTaskArgs = {
  newTask: CreateTaskInput;
};


export type MutationDeleteClientArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteDeliverableArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Float']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetPasswordFromActivationArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateClientArgs = {
  id: Scalars['Float']['input'];
  newEmail?: InputMaybe<Scalars['String']['input']>;
  newName?: InputMaybe<Scalars['String']['input']>;
  newStatus?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCompanyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDeliverableArgs = {
  data: UpdateDeliverableInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  data: UpdateTaskInput;
  id: Scalars['Float']['input'];
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
  status?: Maybe<ProjectStatus>;
};

/** Project, task or deliverable status */
export enum ProjectStatus {
  Blocked = 'BLOCKED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Modify = 'MODIFY',
  NotStarted = 'NOT_STARTED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  getAccountById?: Maybe<Account>;
  getAllAccounts: Array<Account>;
  getAllClients: Array<Client>;
  getAllCompanies: Array<Company>;
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
  id: Scalars['String']['input'];
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

/** The status of a Task */
export enum TaskStatus {
  Blocked = 'BLOCKED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type TrackerStats = {
  __typename?: 'TrackerStats';
  approvedDeliverables?: Maybe<Scalars['Float']['output']>;
  lateProjects?: Maybe<Scalars['Float']['output']>;
  needReview?: Maybe<Scalars['Float']['output']>;
};

export type UpdateDeliverableInput = {
  deliveryDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  perimeter?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Float']['input']>;
  reviewTimes?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<DeliverableStatus>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  deliverableId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
};

export type CreateAccountMutationVariables = Exact<{
  role: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: string } };

export type ActivateAccountAndReturnTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ActivateAccountAndReturnTokenMutation = { __typename?: 'Mutation', activateAccountAndReturnToken: string };

export type SetPasswordFromActivationMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SetPasswordFromActivationMutation = { __typename?: 'Mutation', setPasswordFromActivation: boolean };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type MutationMutationVariables = Exact<{
  accountId: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, clientName?: string | null } };

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

export type DeleteDeliverableMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteDeliverableMutation = { __typename?: 'Mutation', deleteDeliverable: boolean };

export type CreateDeliverableMutationVariables = Exact<{
  newDeliverable: CreateDeliverableInput;
}>;


export type CreateDeliverableMutation = { __typename?: 'Mutation', createDeliverable: { __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, project?: { __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: ProjectStatus | null } | null } };

export type UpdateDeliverableMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  data: UpdateDeliverableInput;
}>;


export type UpdateDeliverableMutation = { __typename?: 'Mutation', updateDeliverable: { __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, reviewTimes?: number | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateProjectMutationVariables = Exact<{
  newProject: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: ProjectStatus | null } };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, projectName: string, description?: string | null, endDate?: string | null } };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['Float']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type CreateTaskMutationVariables = Exact<{
  newTask: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null, deliverable?: { __typename?: 'Deliverable', id: string, name: string } | null } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  data: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null, deliverable?: { __typename?: 'Deliverable', id: string, name: string } | null } };

export type GetAllClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClientsQuery = { __typename?: 'Query', getAllClients: Array<{ __typename?: 'Client', id: string, clientName?: string | null, status?: ClientStatus | null, account?: { __typename?: 'Account', email: string } | null }> };

export type GetAllDeliverablesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDeliverablesQuery = { __typename?: 'Query', getAllDeliverables: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null }> | null }> };

export type GetDeliverableByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetDeliverableByIdQuery = { __typename?: 'Query', getDeliverable?: { __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: string, email: string, role: string, companyUser?: { __typename?: 'CompanyUser', id: string, firstname: string, lastname: string, company?: { __typename?: 'Company', id: string, name: string, address?: string | null, contactInfo?: string | null } | null } | null, client?: { __typename?: 'Client', id: string, clientName?: string | null } | null } | null };

export type MeCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type MeCompanyQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: string, email: string, role: string, companyUser?: { __typename?: 'CompanyUser', id: string, firstname: string, lastname: string, company?: { __typename?: 'Company', id: string, name: string, address?: string | null, contactInfo?: string | null } | null } | null } | null };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', getAllProjects: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: ProjectStatus | null }> };

export type GetProjectsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsByUserQuery = { __typename?: 'Query', getProjectsByUser: Array<{ __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: ProjectStatus | null, client: { __typename?: 'Client', id: string, clientName?: string | null }, deliverables?: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> | null }> | null }> };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectById?: { __typename?: 'Project', id: string, projectName: string, companyUserId: number, description?: string | null, startDate?: string | null, endDate?: string | null, status?: ProjectStatus | null, client: { __typename?: 'Client', id: string, clientName?: string | null }, deliverables?: Array<{ __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> | null }> | null } | null };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null }> };

export type GetTaskByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', getTask?: { __typename?: 'Task', id: string, name: string, description?: string | null, status?: string | null, startDate?: string | null, endDate?: string | null, deliverable?: { __typename?: 'Deliverable', id: string, name: string, perimeter?: string | null, endDate?: string | null, status?: string | null, createdAt?: string | null, reviewTimes?: number | null } | null } | null };

export type GetTrackerStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrackerStatsQuery = { __typename?: 'Query', getTrackerStats: { __typename?: 'TrackerStats', approvedDeliverables?: number | null, lateProjects?: number | null, needReview?: number | null } };

export type UpdatePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };


export const CreateAccountDocument = gql`
    mutation CreateAccount($role: String!, $password: String!, $email: String!) {
  createAccount(role: $role, password: $password, email: $email) {
    id
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      role: // value for 'role'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const ActivateAccountAndReturnTokenDocument = gql`
    mutation ActivateAccountAndReturnToken($token: String!) {
  activateAccountAndReturnToken(token: $token)
}
    `;
export type ActivateAccountAndReturnTokenMutationFn = Apollo.MutationFunction<ActivateAccountAndReturnTokenMutation, ActivateAccountAndReturnTokenMutationVariables>;

/**
 * __useActivateAccountAndReturnTokenMutation__
 *
 * To run a mutation, you first call `useActivateAccountAndReturnTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountAndReturnTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountAndReturnTokenMutation, { data, loading, error }] = useActivateAccountAndReturnTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useActivateAccountAndReturnTokenMutation(baseOptions?: Apollo.MutationHookOptions<ActivateAccountAndReturnTokenMutation, ActivateAccountAndReturnTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateAccountAndReturnTokenMutation, ActivateAccountAndReturnTokenMutationVariables>(ActivateAccountAndReturnTokenDocument, options);
      }
export type ActivateAccountAndReturnTokenMutationHookResult = ReturnType<typeof useActivateAccountAndReturnTokenMutation>;
export type ActivateAccountAndReturnTokenMutationResult = Apollo.MutationResult<ActivateAccountAndReturnTokenMutation>;
export type ActivateAccountAndReturnTokenMutationOptions = Apollo.BaseMutationOptions<ActivateAccountAndReturnTokenMutation, ActivateAccountAndReturnTokenMutationVariables>;
export const SetPasswordFromActivationDocument = gql`
    mutation SetPasswordFromActivation($token: String!, $password: String!) {
  setPasswordFromActivation(token: $token, password: $password)
}
    `;
export type SetPasswordFromActivationMutationFn = Apollo.MutationFunction<SetPasswordFromActivationMutation, SetPasswordFromActivationMutationVariables>;

/**
 * __useSetPasswordFromActivationMutation__
 *
 * To run a mutation, you first call `useSetPasswordFromActivationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordFromActivationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordFromActivationMutation, { data, loading, error }] = useSetPasswordFromActivationMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSetPasswordFromActivationMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordFromActivationMutation, SetPasswordFromActivationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordFromActivationMutation, SetPasswordFromActivationMutationVariables>(SetPasswordFromActivationDocument, options);
      }
export type SetPasswordFromActivationMutationHookResult = ReturnType<typeof useSetPasswordFromActivationMutation>;
export type SetPasswordFromActivationMutationResult = Apollo.MutationResult<SetPasswordFromActivationMutation>;
export type SetPasswordFromActivationMutationOptions = Apollo.BaseMutationOptions<SetPasswordFromActivationMutation, SetPasswordFromActivationMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email)
}
    `;
export type RequestPasswordResetMutationFn = Apollo.MutationFunction<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordResetMutation, { data, loading, error }] = useRequestPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
      }
export type RequestPasswordResetMutationHookResult = ReturnType<typeof useRequestPasswordResetMutation>;
export type RequestPasswordResetMutationResult = Apollo.MutationResult<RequestPasswordResetMutation>;
export type RequestPasswordResetMutationOptions = Apollo.BaseMutationOptions<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation($accountId: String!, $name: String!) {
  createClient(accountId: $accountId, Name: $name) {
    id
    clientName
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
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
export const DeleteDeliverableDocument = gql`
    mutation DeleteDeliverable($id: Float!) {
  deleteDeliverable(id: $id)
}
    `;
export type DeleteDeliverableMutationFn = Apollo.MutationFunction<DeleteDeliverableMutation, DeleteDeliverableMutationVariables>;

/**
 * __useDeleteDeliverableMutation__
 *
 * To run a mutation, you first call `useDeleteDeliverableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeliverableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeliverableMutation, { data, loading, error }] = useDeleteDeliverableMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeliverableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeliverableMutation, DeleteDeliverableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeliverableMutation, DeleteDeliverableMutationVariables>(DeleteDeliverableDocument, options);
      }
export type DeleteDeliverableMutationHookResult = ReturnType<typeof useDeleteDeliverableMutation>;
export type DeleteDeliverableMutationResult = Apollo.MutationResult<DeleteDeliverableMutation>;
export type DeleteDeliverableMutationOptions = Apollo.BaseMutationOptions<DeleteDeliverableMutation, DeleteDeliverableMutationVariables>;
export const CreateDeliverableDocument = gql`
    mutation CreateDeliverable($newDeliverable: CreateDeliverableInput!) {
  createDeliverable(newDeliverable: $newDeliverable) {
    id
    name
    perimeter
    endDate
    status
    createdAt
    reviewTimes
    project {
      id
      projectName
      companyUserId
      description
      startDate
      endDate
      status
    }
  }
}
    `;
export type CreateDeliverableMutationFn = Apollo.MutationFunction<CreateDeliverableMutation, CreateDeliverableMutationVariables>;

/**
 * __useCreateDeliverableMutation__
 *
 * To run a mutation, you first call `useCreateDeliverableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliverableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliverableMutation, { data, loading, error }] = useCreateDeliverableMutation({
 *   variables: {
 *      newDeliverable: // value for 'newDeliverable'
 *   },
 * });
 */
export function useCreateDeliverableMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeliverableMutation, CreateDeliverableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeliverableMutation, CreateDeliverableMutationVariables>(CreateDeliverableDocument, options);
      }
export type CreateDeliverableMutationHookResult = ReturnType<typeof useCreateDeliverableMutation>;
export type CreateDeliverableMutationResult = Apollo.MutationResult<CreateDeliverableMutation>;
export type CreateDeliverableMutationOptions = Apollo.BaseMutationOptions<CreateDeliverableMutation, CreateDeliverableMutationVariables>;
export const UpdateDeliverableDocument = gql`
    mutation UpdateDeliverable($id: Float!, $data: UpdateDeliverableInput!) {
  updateDeliverable(id: $id, data: $data) {
    id
    name
    perimeter
    endDate
    status
    reviewTimes
  }
}
    `;
export type UpdateDeliverableMutationFn = Apollo.MutationFunction<UpdateDeliverableMutation, UpdateDeliverableMutationVariables>;

/**
 * __useUpdateDeliverableMutation__
 *
 * To run a mutation, you first call `useUpdateDeliverableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliverableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliverableMutation, { data, loading, error }] = useUpdateDeliverableMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDeliverableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeliverableMutation, UpdateDeliverableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeliverableMutation, UpdateDeliverableMutationVariables>(UpdateDeliverableDocument, options);
      }
export type UpdateDeliverableMutationHookResult = ReturnType<typeof useUpdateDeliverableMutation>;
export type UpdateDeliverableMutationResult = Apollo.MutationResult<UpdateDeliverableMutation>;
export type UpdateDeliverableMutationOptions = Apollo.BaseMutationOptions<UpdateDeliverableMutation, UpdateDeliverableMutationVariables>;
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
export const UpdateProjectDocument = gql`
    mutation UpdateProject($data: UpdateProjectInput!) {
  updateProject(data: $data) {
    id
    projectName
    description
    endDate
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: Float!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: Float!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($newTask: CreateTaskInput!) {
  createTask(newTask: $newTask) {
    id
    name
    description
    status
    startDate
    endDate
    deliverable {
      id
      name
    }
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      newTask: // value for 'newTask'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: Float!, $data: UpdateTaskInput!) {
  updateTask(id: $id, data: $data) {
    id
    name
    description
    status
    startDate
    endDate
    deliverable {
      id
      name
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
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
export const GetDeliverableByIdDocument = gql`
    query GetDeliverableById($id: Float!) {
  getDeliverable(id: $id) {
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
    `;

/**
 * __useGetDeliverableByIdQuery__
 *
 * To run a query within a React component, call `useGetDeliverableByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliverableByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliverableByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeliverableByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables> & ({ variables: GetDeliverableByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>(GetDeliverableByIdDocument, options);
      }
export function useGetDeliverableByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>(GetDeliverableByIdDocument, options);
        }
export function useGetDeliverableByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>(GetDeliverableByIdDocument, options);
        }
export type GetDeliverableByIdQueryHookResult = ReturnType<typeof useGetDeliverableByIdQuery>;
export type GetDeliverableByIdLazyQueryHookResult = ReturnType<typeof useGetDeliverableByIdLazyQuery>;
export type GetDeliverableByIdSuspenseQueryHookResult = ReturnType<typeof useGetDeliverableByIdSuspenseQuery>;
export type GetDeliverableByIdQueryResult = Apollo.QueryResult<GetDeliverableByIdQuery, GetDeliverableByIdQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    role
    companyUser {
      id
      firstname
      lastname
      company {
        id
        name
        address
        contactInfo
      }
    }
    client {
      id
      clientName
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeCompanyDocument = gql`
    query MeCompany {
  me {
    id
    email
    role
    companyUser {
      id
      firstname
      lastname
      company {
        id
        name
        address
        contactInfo
      }
    }
  }
}
    `;

/**
 * __useMeCompanyQuery__
 *
 * To run a query within a React component, call `useMeCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeCompanyQuery(baseOptions?: Apollo.QueryHookOptions<MeCompanyQuery, MeCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeCompanyQuery, MeCompanyQueryVariables>(MeCompanyDocument, options);
      }
export function useMeCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeCompanyQuery, MeCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeCompanyQuery, MeCompanyQueryVariables>(MeCompanyDocument, options);
        }
export function useMeCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeCompanyQuery, MeCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeCompanyQuery, MeCompanyQueryVariables>(MeCompanyDocument, options);
        }
export type MeCompanyQueryHookResult = ReturnType<typeof useMeCompanyQuery>;
export type MeCompanyLazyQueryHookResult = ReturnType<typeof useMeCompanyLazyQuery>;
export type MeCompanySuspenseQueryHookResult = ReturnType<typeof useMeCompanySuspenseQuery>;
export type MeCompanyQueryResult = Apollo.QueryResult<MeCompanyQuery, MeCompanyQueryVariables>;
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
export const GetAllTasksDocument = gql`
    query GetAllTasks {
  getAllTasks {
    id
    name
    description
    status
    startDate
    endDate
  }
}
    `;

/**
 * __useGetAllTasksQuery__
 *
 * To run a query within a React component, call `useGetAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
      }
export function useGetAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export function useGetAllTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTasksQuery, GetAllTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTasksQuery, GetAllTasksQueryVariables>(GetAllTasksDocument, options);
        }
export type GetAllTasksQueryHookResult = ReturnType<typeof useGetAllTasksQuery>;
export type GetAllTasksLazyQueryHookResult = ReturnType<typeof useGetAllTasksLazyQuery>;
export type GetAllTasksSuspenseQueryHookResult = ReturnType<typeof useGetAllTasksSuspenseQuery>;
export type GetAllTasksQueryResult = Apollo.QueryResult<GetAllTasksQuery, GetAllTasksQueryVariables>;
export const GetTaskByIdDocument = gql`
    query GetTaskById($id: Float!) {
  getTask(id: $id) {
    id
    name
    description
    status
    startDate
    endDate
    deliverable {
      id
      name
      perimeter
      endDate
      status
      createdAt
      reviewTimes
    }
  }
}
    `;

/**
 * __useGetTaskByIdQuery__
 *
 * To run a query within a React component, call `useGetTaskByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables> & ({ variables: GetTaskByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
      }
export function useGetTaskByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
        }
export function useGetTaskByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskByIdQuery, GetTaskByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskByIdQuery, GetTaskByIdQueryVariables>(GetTaskByIdDocument, options);
        }
export type GetTaskByIdQueryHookResult = ReturnType<typeof useGetTaskByIdQuery>;
export type GetTaskByIdLazyQueryHookResult = ReturnType<typeof useGetTaskByIdLazyQuery>;
export type GetTaskByIdSuspenseQueryHookResult = ReturnType<typeof useGetTaskByIdSuspenseQuery>;
export type GetTaskByIdQueryResult = Apollo.QueryResult<GetTaskByIdQuery, GetTaskByIdQueryVariables>;
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
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
  updatePassword(currentPassword: $currentPassword, newPassword: $newPassword)
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;