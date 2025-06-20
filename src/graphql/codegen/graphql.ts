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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CreateProfileInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  hashedPassword: Scalars['String']['input'];
  role?: InputMaybe<Array<Role>>;
  username: Scalars['String']['input'];
};

export type CreateUserProfileInput = {
  profile?: InputMaybe<CreateProfileInput>;
  user?: InputMaybe<CreateUserInput>;
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profile?: Maybe<Array<Profile>>;
};

export type DepartmentCount = {
  __typename?: 'DepartmentCount';
  profile: Scalars['Int']['output'];
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

export type DepartmentWhereInput = {
  AND?: InputMaybe<Array<DepartmentWhereInput>>;
  NOT?: InputMaybe<Array<DepartmentWhereInput>>;
  OR?: InputMaybe<Array<DepartmentWhereInput>>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileListRelationFilter>;
};

export type Embedding = {
  __typename?: 'Embedding';
  content?: Maybe<Scalars['JSON']['output']>;
  embedding?: Maybe<Array<Scalars['Float']['output']>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
};

export type EnumRoleNullableListFilter = {
  equals?: InputMaybe<Array<Role>>;
  has?: InputMaybe<Role>;
  hasEvery?: InputMaybe<Array<Role>>;
  hasSome?: InputMaybe<Array<Role>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GeneralMsg = {
  __typename?: 'GeneralMsg';
  message: Scalars['String']['output'];
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

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createEmbedding: Embedding;
  createUser: GeneralMsg;
  logOut: GeneralMsg;
  signin: SignResponse;
  signup: SignResponse;
  upsertDepartment: GeneralMsg;
};


export type MutationCreateEmbeddingArgs = {
  content: Scalars['JSON']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserProfileInput;
};


export type MutationSigninArgs = {
  signInInput: SignInInput;
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpsertDepartmentArgs = {
  deptId?: InputMaybe<Scalars['String']['input']>;
  payload: UpsertDepartmentInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
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

export type Profile = {
  __typename?: 'Profile';
  address?: Maybe<Scalars['JSON']['output']>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  dateHired?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['String']['output']>;
  designation?: Maybe<Scalars['String']['output']>;
  employeeID?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ProfileListRelationFilter = {
  every?: InputMaybe<ProfileWhereInput>;
  none?: InputMaybe<ProfileWhereInput>;
  some?: InputMaybe<ProfileWhereInput>;
};

export type ProfileNullableScalarRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  address?: InputMaybe<JsonNullableFilter>;
  birthDate?: InputMaybe<DateTimeNullableFilter>;
  contact?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<StringNullableFilter>;
  dateHired?: InputMaybe<DateTimeNullableFilter>;
  department?: InputMaybe<DepartmentNullableScalarRelationFilter>;
  departmentId?: InputMaybe<StringNullableFilter>;
  designation?: InputMaybe<StringNullableFilter>;
  employeeID?: InputMaybe<IntNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  middleName?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updatedBy?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserNullableScalarRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type Query = {
  __typename?: 'Query';
  findAllDepartments: DepartmentList;
  findAllUsers: UserList;
  findOneUser: Profile;
  meQuery: MeQuery;
};


export type QueryFindAllDepartmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepartmentWhereInput>;
};


export type QueryFindAllUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryFindOneUserArgs = {
  profileId: Scalars['String']['input'];
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

export type UpsertDepartmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  /** @Validator.@IsEmail() */
  email: Scalars['String']['output'];
  hashedRefreshToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isApprove: Scalars['Boolean']['output'];
  profile?: Maybe<Profile>;
  role?: Maybe<Array<Role>>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserList = {
  __typename?: 'UserList';
  data: Array<Profile>;
  meta?: Maybe<Meta>;
};

export type UserNullableScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringFilter>;
  hashedPassword?: InputMaybe<StringFilter>;
  hashedRefreshToken?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isApprove?: InputMaybe<BoolFilter>;
  profile?: InputMaybe<ProfileNullableScalarRelationFilter>;
  role?: InputMaybe<EnumRoleNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updatedBy?: InputMaybe<StringNullableFilter>;
  username?: InputMaybe<StringFilter>;
};
