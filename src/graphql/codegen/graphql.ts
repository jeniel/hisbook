/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuditLog = {
  __typename?: 'AuditLog';
  action?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ticket?: Maybe<MissedLogoutTicket>;
  ticketId?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type AuditLogListRelationFilter = {
  every?: InputMaybe<AuditLogWhereInput>;
  none?: InputMaybe<AuditLogWhereInput>;
  some?: InputMaybe<AuditLogWhereInput>;
};

export type AuditLogWhereInput = {
  AND?: InputMaybe<Array<AuditLogWhereInput>>;
  NOT?: InputMaybe<Array<AuditLogWhereInput>>;
  OR?: InputMaybe<Array<AuditLogWhereInput>>;
  action?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  ticket?: InputMaybe<MissedLogoutTicketNullableScalarRelationFilter>;
  ticketId?: InputMaybe<StringNullableFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  updatedBy?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserNullableScalarRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type CensusSummary = {
  __typename?: 'CensusSummary';
  departmentsWithUserCount: Array<DepartmentUserCount>;
  ticketByUserId?: Maybe<Array<TicketStatusCount>>;
  ticketsByStatus: Array<TicketStatusCount>;
  totalDepartments: Scalars['Int']['output'];
  totalEvents: Scalars['Int']['output'];
  totalPosts: Scalars['Int']['output'];
  totalTickets: Scalars['Int']['output'];
  totalTicketsByUserId?: Maybe<Scalars['Int']['output']>;
  totalUsers: Scalars['Int']['output'];
};

export type CreateDepartmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateEventInput = {
  detailsUrl?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  location: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  employeeID?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTicketInput = {
  createdById?: InputMaybe<Scalars['String']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  missedAt: Scalars['DateTime']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  screenshot?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  subject?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  departmentName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Array<Role>>;
  username: Scalars['String']['input'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Department = {
  __typename?: 'Department';
  _count: DepartmentCount;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profiles?: Maybe<Array<User>>;
};

export type DepartmentCount = {
  __typename?: 'DepartmentCount';
  profiles: Scalars['Int']['output'];
};

export type DepartmentList = {
  __typename?: 'DepartmentList';
  data: Array<Department>;
  meta?: Maybe<Meta>;
};

export type DepartmentNullableScalarRelationFilter = {
  is?: InputMaybe<DepartmentWhereInput>;
  isNot?: InputMaybe<DepartmentWhereInput>;
};

export type DepartmentUserCount = {
  __typename?: 'DepartmentUserCount';
  departmentDescription: Scalars['String']['output'];
  departmentId: Scalars['String']['output'];
  departmentName: Scalars['String']['output'];
  userCount: Scalars['Int']['output'];
};

export type DepartmentWhereInput = {
  AND?: InputMaybe<Array<DepartmentWhereInput>>;
  NOT?: InputMaybe<Array<DepartmentWhereInput>>;
  OR?: InputMaybe<Array<DepartmentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  profiles?: InputMaybe<UserListRelationFilter>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumRoleNullableListFilter = {
  equals?: InputMaybe<Array<Role>>;
  has?: InputMaybe<Role>;
  hasEvery?: InputMaybe<Array<Role>>;
  hasSome?: InputMaybe<Array<Role>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnumStatusNullableFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type Event = {
  __typename?: 'Event';
  createdAt: Scalars['DateTime']['output'];
  detailsUrl?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
};

export type EventList = {
  __typename?: 'EventList';
  data: Array<Event>;
  meta?: Maybe<Meta>;
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  NOT?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  detailsUrl?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeNullableFilter>;
  title?: InputMaybe<StringFilter>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Others = 'Others'
}

export type GeneralMsg = {
  __typename?: 'GeneralMsg';
  message: Scalars['String']['output'];
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type MeQuery = {
  __typename?: 'MeQuery';
  isSignedIn: Scalars['Boolean']['output'];
  user: User;
};

export type Meta = {
  __typename?: 'Meta';
  currentPage: Scalars['Float']['output'];
  lastPage: Scalars['Float']['output'];
  next?: Maybe<Scalars['Float']['output']>;
  perPage: Scalars['Float']['output'];
  prev?: Maybe<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type MissedLogoutTicket = {
  __typename?: 'MissedLogoutTicket';
  _count: MissedLogoutTicketCount;
  auditLogs?: Maybe<Array<AuditLog>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  floor?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  missedAt?: Maybe<Scalars['DateTime']['output']>;
  remarks?: Maybe<Scalars['String']['output']>;
  screenshot?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Status>;
  subject?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type MissedLogoutTicketCount = {
  __typename?: 'MissedLogoutTicketCount';
  auditLogs: Scalars['Int']['output'];
};

export type MissedLogoutTicketList = {
  __typename?: 'MissedLogoutTicketList';
  data: Array<MissedLogoutTicket>;
  meta?: Maybe<Meta>;
};

export type MissedLogoutTicketListRelationFilter = {
  every?: InputMaybe<MissedLogoutTicketWhereInput>;
  none?: InputMaybe<MissedLogoutTicketWhereInput>;
  some?: InputMaybe<MissedLogoutTicketWhereInput>;
};

export type MissedLogoutTicketNullableScalarRelationFilter = {
  is?: InputMaybe<MissedLogoutTicketWhereInput>;
  isNot?: InputMaybe<MissedLogoutTicketWhereInput>;
};

export type MissedLogoutTicketWhereInput = {
  AND?: InputMaybe<Array<MissedLogoutTicketWhereInput>>;
  NOT?: InputMaybe<Array<MissedLogoutTicketWhereInput>>;
  OR?: InputMaybe<Array<MissedLogoutTicketWhereInput>>;
  auditLogs?: InputMaybe<AuditLogListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserNullableScalarRelationFilter>;
  createdById?: InputMaybe<StringNullableFilter>;
  floor?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  missedAt?: InputMaybe<DateTimeNullableFilter>;
  remarks?: InputMaybe<StringNullableFilter>;
  screenshot?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumStatusNullableFilter>;
  subject?: InputMaybe<StringNullableFilter>;
  updatedBy?: InputMaybe<StringNullableFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDepartment: GeneralMsg;
  createEvent: GeneralMsg;
  createPost: GeneralMsg;
  createProfile: GeneralMsg;
  createTicket: GeneralMsg;
  createUser: GeneralMsg;
  deleteDepartment: GeneralMsg;
  deleteEvent: GeneralMsg;
  deletePost: GeneralMsg;
  deleteProfile: GeneralMsg;
  deleteTicket: GeneralMsg;
  deleteUser: GeneralMsg;
  logOut: GeneralMsg;
  signin: SignResponse;
  signup: SignResponse;
  updateDepartment: GeneralMsg;
  updateEvent: GeneralMsg;
  updatePost: GeneralMsg;
  updateProfile: GeneralMsg;
  updateTicket: GeneralMsg;
  updateUser: GeneralMsg;
};


export type MutationCreateDepartmentArgs = {
  payload: CreateDepartmentInput;
};


export type MutationCreateEventArgs = {
  payload: CreateEventInput;
};


export type MutationCreatePostArgs = {
  payload: CreatePostInput;
};


export type MutationCreateProfileArgs = {
  payload: CreateProfileInput;
};


export type MutationCreateTicketArgs = {
  payload: CreateTicketInput;
};


export type MutationCreateUserArgs = {
  payload: CreateUserInput;
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationDeleteProfileArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTicketArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationSigninArgs = {
  signInInput: SignInInput;
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdateDepartmentArgs = {
  id: Scalars['String']['input'];
  payload: UpdateDepartmentInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['String']['input'];
  payload: UpdateEventInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  postId: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  id: Scalars['String']['input'];
  payload: UpdateProfileInput;
};


export type MutationUpdateTicketArgs = {
  id: Scalars['String']['input'];
  payload: UpdateTicketInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  payload: UpdateUserInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumStatusNullableFilter = {
  equals?: InputMaybe<Status>;
  in?: InputMaybe<Array<Status>>;
  not?: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn?: InputMaybe<Array<Status>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Posts = {
  __typename?: 'Posts';
  content: Scalars['String']['output'];
  datePosted: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type PostsList = {
  __typename?: 'PostsList';
  data: Array<Posts>;
  meta?: Maybe<Meta>;
};

export type PostsListRelationFilter = {
  every?: InputMaybe<PostsWhereInput>;
  none?: InputMaybe<PostsWhereInput>;
  some?: InputMaybe<PostsWhereInput>;
};

export type PostsWhereInput = {
  AND?: InputMaybe<Array<PostsWhereInput>>;
  NOT?: InputMaybe<Array<PostsWhereInput>>;
  OR?: InputMaybe<Array<PostsWhereInput>>;
  content?: InputMaybe<StringFilter>;
  datePosted?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<StringNullableListFilter>;
  user?: InputMaybe<UserNullableScalarRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  employeeID?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ProfileList = {
  __typename?: 'ProfileList';
  data: Array<Profile>;
  meta?: Maybe<Meta>;
};

export type ProfileNullableScalarRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  birthDate?: InputMaybe<DateTimeNullableFilter>;
  contact?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  employeeID?: InputMaybe<IntNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  middleName?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableScalarRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type Query = {
  __typename?: 'Query';
  findAllDepartments: DepartmentList;
  findAllEvents: EventList;
  findAllPosts: PostsList;
  findAllPostsCreatedByUser: PostsList;
  findAllProfiles: ProfileList;
  findAllTickets: MissedLogoutTicketList;
  findAllUsers: UserList;
  findProfile: Profile;
  findTicketbyID?: Maybe<MissedLogoutTicket>;
  findTicketsByUser: MissedLogoutTicketList;
  getCensusSummary: CensusSummary;
  getMyWorkedTickets: MissedLogoutTicketList;
  meQuery: MeQuery;
};


export type QueryFindAllDepartmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepartmentWhereInput>;
};


export type QueryFindAllEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryFindAllPostsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PostsWhereInput>;
};


export type QueryFindAllPostsCreatedByUserArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  perPage?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
  where?: InputMaybe<PostsWhereInput>;
};


export type QueryFindAllProfilesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryFindAllTicketsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MissedLogoutTicketWhereInput>;
};


export type QueryFindAllUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFindProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindTicketbyIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindTicketsByUserArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
  where?: InputMaybe<MissedLogoutTicketWhereInput>;
};


export type QueryGetCensusSummaryArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMyWorkedTicketsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
  where?: InputMaybe<MissedLogoutTicketWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignInInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SignResponse = {
  __typename?: 'SignResponse';
  accessToken: Scalars['String']['output'];
  isSignedIn: Scalars['Boolean']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type SignUpInput = {
  designation?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum Status {
  Approved = 'Approved',
  Completed = 'Completed',
  Pending = 'Pending'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TicketStatusCount = {
  __typename?: 'TicketStatusCount';
  count: Scalars['Int']['output'];
  status: Status;
};

export type UpdateDepartmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateEventInput = {
  detailsUrl?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  location: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  contact?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  employeeID?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTicketInput = {
  createdById?: InputMaybe<Scalars['String']['input']>;
  floor?: InputMaybe<Scalars['String']['input']>;
  missedAt: Scalars['DateTime']['input'];
  remarks?: InputMaybe<Scalars['String']['input']>;
  screenshot?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  subject?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  departmentName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<Array<Role>>;
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  MissedLogoutTicket?: Maybe<Array<MissedLogoutTicket>>;
  _count: UserCount;
  auditLogs?: Maybe<Array<AuditLog>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['String']['output']>;
  /** @Validator.@IsEmail() */
  email: Scalars['String']['output'];
  hashedRefreshToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  posts?: Maybe<Array<Posts>>;
  profile?: Maybe<Profile>;
  role?: Maybe<Array<Role>>;
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  MissedLogoutTicket: Scalars['Int']['output'];
  auditLogs: Scalars['Int']['output'];
  posts: Scalars['Int']['output'];
};

export type UserList = {
  __typename?: 'UserList';
  data: Array<User>;
  meta?: Maybe<Meta>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserNullableScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  MissedLogoutTicket?: InputMaybe<MissedLogoutTicketListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  auditLogs?: InputMaybe<AuditLogListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  department?: InputMaybe<DepartmentNullableScalarRelationFilter>;
  departmentId?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringFilter>;
  hashedPassword?: InputMaybe<StringFilter>;
  hashedRefreshToken?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostsListRelationFilter>;
  profile?: InputMaybe<ProfileNullableScalarRelationFilter>;
  role?: InputMaybe<EnumRoleNullableListFilter>;
  username?: InputMaybe<StringFilter>;
};
