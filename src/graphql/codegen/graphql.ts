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

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  message: MessageContent;
  session_id: Scalars['String']['output'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  data: Array<Chat>;
  pagination: PaginationChat;
};

export type CreateCollectionInput = {
  distance?: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type CreateIndexInput = {
  collectionName: Scalars['String']['input'];
  fieldName: Scalars['String']['input'];
  fieldSchema?: Scalars['String']['input'];
};

export type CreatePostPage = {
  /** The message to post on the Facebook Page */
  message: Scalars['String']['input'];
  /** The Facebook Page ID */
  pageId: Scalars['String']['input'];
};

export type CreateProfileInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTenant = {
  chatTableName: Scalars['String']['input'];
  collectionName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  distance?: Scalars['String']['input'];
  documentTableName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  size: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
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

export enum DistanceMetric {
  Cosine = 'Cosine',
  Dot = 'Dot',
  Euclid = 'Euclid'
}

export type DocumentToEmbedInput = {
  content: Scalars['String']['input'];
  documentType: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  tenantId: Scalars['String']['input'];
};

export type EnumDistanceMetricFilter = {
  equals?: InputMaybe<DistanceMetric>;
  in?: InputMaybe<Array<DistanceMetric>>;
  not?: InputMaybe<NestedEnumDistanceMetricFilter>;
  notIn?: InputMaybe<Array<DistanceMetric>>;
};

export type EnumRoleNullableListFilter = {
  equals?: InputMaybe<Array<Role>>;
  has?: InputMaybe<Role>;
  hasEvery?: InputMaybe<Array<Role>>;
  hasSome?: InputMaybe<Array<Role>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FaceBookPageList = {
  __typename?: 'FaceBookPageList';
  data: Array<FacebookPage>;
  meta?: Maybe<Meta>;
};

export type FacebookPage = {
  __typename?: 'FacebookPage';
  _count: FacebookPageCount;
  about?: Maybe<Scalars['String']['output']>;
  accessToken?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  engagementCount?: Maybe<Scalars['Int']['output']>;
  engagementMessage?: Maybe<Scalars['String']['output']>;
  facebookPagePost?: Maybe<Array<FacebookPagePost>>;
  fanCount?: Maybe<Scalars['Int']['output']>;
  fbId?: Maybe<Scalars['String']['output']>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overallStarRating?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type FacebookPageCount = {
  __typename?: 'FacebookPageCount';
  facebookPagePost: Scalars['Int']['output'];
};

export type FacebookPagePost = {
  __typename?: 'FacebookPagePost';
  createdAt: Scalars['DateTime']['output'];
  createdTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  page: FacebookPage;
  pageId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FacebookPagePostListRelationFilter = {
  every?: InputMaybe<FacebookPagePostWhereInput>;
  none?: InputMaybe<FacebookPagePostWhereInput>;
  some?: InputMaybe<FacebookPagePostWhereInput>;
};

export type FacebookPagePostWhereInput = {
  AND?: InputMaybe<Array<FacebookPagePostWhereInput>>;
  NOT?: InputMaybe<Array<FacebookPagePostWhereInput>>;
  OR?: InputMaybe<Array<FacebookPagePostWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdTime?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringNullableFilter>;
  page?: InputMaybe<FacebookPageScalarRelationFilter>;
  pageId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FacebookPageScalarRelationFilter = {
  is?: InputMaybe<FacebookPageWhereInput>;
  isNot?: InputMaybe<FacebookPageWhereInput>;
};

export type FacebookPageWhereInput = {
  AND?: InputMaybe<Array<FacebookPageWhereInput>>;
  NOT?: InputMaybe<Array<FacebookPageWhereInput>>;
  OR?: InputMaybe<Array<FacebookPageWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  accessToken?: InputMaybe<StringNullableFilter>;
  category?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  engagementCount?: InputMaybe<IntNullableFilter>;
  engagementMessage?: InputMaybe<StringNullableFilter>;
  facebookPagePost?: InputMaybe<FacebookPagePostListRelationFilter>;
  fanCount?: InputMaybe<IntNullableFilter>;
  fbId?: InputMaybe<StringNullableFilter>;
  followersCount?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  imageUrl?: InputMaybe<StringNullableFilter>;
  link?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  overallStarRating?: InputMaybe<FloatNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringNullableFilter>;
  website?: InputMaybe<StringNullableFilter>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
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

export type Keyword_DailyListRelationFilter = {
  every?: InputMaybe<Keyword_DailyWhereInput>;
  none?: InputMaybe<Keyword_DailyWhereInput>;
  some?: InputMaybe<Keyword_DailyWhereInput>;
};

export type KeywordsListRelationFilter = {
  every?: InputMaybe<KeywordsWhereInput>;
  none?: InputMaybe<KeywordsWhereInput>;
  some?: InputMaybe<KeywordsWhereInput>;
};

export type MeQuery = {
  __typename?: 'MeQuery';
  isSignedIn: Scalars['Boolean']['output'];
  user: User;
};

export type MessageContent = {
  __typename?: 'MessageContent';
  additional_kwargs?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  invalid_tool_calls: Array<Scalars['String']['output']>;
  response_metadata?: Maybe<Scalars['String']['output']>;
  tool_calls: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
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
  createPagePost: GeneralMsg;
  createQdrantCollection: Scalars['Boolean']['output'];
  createQdrantIndex: Scalars['Boolean']['output'];
  createTenant: GeneralMsg;
  createUser: GeneralMsg;
  deleteQdrantCollection: Scalars['Boolean']['output'];
  deleteQdrantPoints: Scalars['Boolean']['output'];
  deleteTenantDocuments: Scalars['String']['output'];
  initializeDocumentCollection: Scalars['Boolean']['output'];
  logOut: GeneralMsg;
  processAndStoreDocuments: Scalars['Boolean']['output'];
  signin: SignResponse;
  signup: SignResponse;
  upsertDepartment: GeneralMsg;
  upsertQdrantPoints: Scalars['Boolean']['output'];
};


export type MutationCreatePagePostArgs = {
  CreatePostInput: CreatePostPage;
};


export type MutationCreateQdrantCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateQdrantIndexArgs = {
  input: CreateIndexInput;
};


export type MutationCreateTenantArgs = {
  createTenant: CreateTenant;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserProfileInput;
};


export type MutationDeleteQdrantCollectionArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteQdrantPointsArgs = {
  collectionName: Scalars['String']['input'];
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteTenantDocumentsArgs = {
  collectionName?: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};


export type MutationInitializeDocumentCollectionArgs = {
  collectionName: Scalars['String']['input'];
  vectorSize?: Scalars['Float']['input'];
};


export type MutationProcessAndStoreDocumentsArgs = {
  input: ProcessDocumentsInput;
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


export type MutationUpsertQdrantPointsArgs = {
  input: UpsertPointsInput;
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

export type NestedEnumDistanceMetricFilter = {
  equals?: InputMaybe<DistanceMetric>;
  in?: InputMaybe<Array<DistanceMetric>>;
  not?: InputMaybe<NestedEnumDistanceMetricFilter>;
  notIn?: InputMaybe<Array<DistanceMetric>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
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

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PaginationChat = {
  __typename?: 'PaginationChat';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ProcessDocumentsInput = {
  collectionName?: Scalars['String']['input'];
  documents: Array<DocumentToEmbedInput>;
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

export type QdrantCollectionInfoType = {
  __typename?: 'QdrantCollectionInfoType';
  config?: Maybe<Scalars['JSON']['output']>;
  indexed_vectors_count: Scalars['Int']['output'];
  payload_schema?: Maybe<Scalars['JSON']['output']>;
  points_count: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  vectors_count: Scalars['Int']['output'];
};

export type QdrantCollectionType = {
  __typename?: 'QdrantCollectionType';
  name: Scalars['String']['output'];
};

export type QdrantCountResultType = {
  __typename?: 'QdrantCountResultType';
  count: Scalars['Int']['output'];
};

export type QdrantPointInput = {
  id: Scalars['ID']['input'];
  payload?: InputMaybe<Scalars['JSON']['input']>;
  vector: Array<Scalars['Float']['input']>;
};

export type QdrantPointType = {
  __typename?: 'QdrantPointType';
  id: Scalars['ID']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  vector?: Maybe<Array<Scalars['Float']['output']>>;
  version?: Maybe<Scalars['Int']['output']>;
};

export type QdrantScrollResultType = {
  __typename?: 'QdrantScrollResultType';
  next_page_offset?: Maybe<Scalars['String']['output']>;
  points: Array<QdrantPointType>;
};

export type QdrantSearchResultType = {
  __typename?: 'QdrantSearchResultType';
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  payload?: Maybe<Scalars['JSON']['output']>;
  score: Scalars['Float']['output'];
  vector?: Maybe<Array<Scalars['Float']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  chatWithModel: Scalars['String']['output'];
  findAllDepartments: DepartmentList;
  findAllFbDetails: FaceBookPageList;
  findAllTenants: Array<Tenant>;
  findAllUsers: UserList;
  findChatBySession: ChatResponse;
  findOneUser: Profile;
  findSimilarDocuments: Array<QdrantSearchResultType>;
  findTenantById: Tenant;
  getAllKeyWorkByTenant: Reports;
  hybridSearch: Array<QdrantSearchResultType>;
  meQuery: MeQuery;
  qdrantCollection: QdrantCollectionInfoType;
  qdrantCollectionAnalytics: Scalars['String']['output'];
  qdrantCollectionExists: Scalars['Boolean']['output'];
  qdrantCollections: Array<QdrantCollectionType>;
  qdrantPoint?: Maybe<QdrantPointType>;
  qdrantPoints: Array<QdrantPointType>;
  qdrantPointsCount: QdrantCountResultType;
  qdrantQueryPoints: Array<QdrantSearchResultType>;
  qdrantScrollPoints: QdrantScrollResultType;
  qdrantSearchPoints: Array<QdrantSearchResultType>;
  semanticSearch: Array<QdrantSearchResultType>;
  syncToGraphApi: GeneralMsg;
};


export type QueryFindAllDepartmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepartmentWhereInput>;
};


export type QueryFindAllFbDetailsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FacebookPageWhereInput>;
};


export type QueryFindAllUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QueryFindChatBySessionArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  sessionId?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['String']['input'];
};


export type QueryFindOneUserArgs = {
  profileId: Scalars['String']['input'];
};


export type QueryFindSimilarDocumentsArgs = {
  collectionName?: Scalars['String']['input'];
  documentId: Scalars['String']['input'];
  limit?: Scalars['Float']['input'];
  tenantId: Scalars['String']['input'];
  threshold?: Scalars['Float']['input'];
};


export type QueryFindTenantByIdArgs = {
  tenantId: Scalars['String']['input'];
};


export type QueryGetAllKeyWorkByTenantArgs = {
  where?: InputMaybe<KeywordsWhereInput>;
};


export type QueryHybridSearchArgs = {
  collectionName?: Scalars['String']['input'];
  keywords: Array<Scalars['String']['input']>;
  limit?: Scalars['Float']['input'];
  query: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};


export type QueryQdrantCollectionArgs = {
  name: Scalars['String']['input'];
};


export type QueryQdrantCollectionAnalyticsArgs = {
  collectionName?: Scalars['String']['input'];
};


export type QueryQdrantCollectionExistsArgs = {
  name: Scalars['String']['input'];
};


export type QueryQdrantPointArgs = {
  collectionName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type QueryQdrantPointsArgs = {
  collectionName: Scalars['String']['input'];
  ids: Array<Scalars['ID']['input']>;
};


export type QueryQdrantPointsCountArgs = {
  collectionName: Scalars['String']['input'];
  filter?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryQdrantQueryPointsArgs = {
  input: SearchPointsInput;
};


export type QueryQdrantScrollPointsArgs = {
  input: ScrollPointsInput;
};


export type QueryQdrantSearchPointsArgs = {
  input: SearchPointsInput;
};


export type QuerySemanticSearchArgs = {
  input: SemanticSearchInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Reports = {
  __typename?: 'Reports';
  keywords: Array<Keywords>;
  totalKeyWord?: Maybe<Scalars['Int']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type ScrollPointsInput = {
  collectionName: Scalars['String']['input'];
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: Scalars['Int']['input'];
  offset?: InputMaybe<Scalars['String']['input']>;
};

export type SearchPointsInput = {
  collectionName: Scalars['String']['input'];
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: Scalars['Int']['input'];
  vector: Array<Scalars['Float']['input']>;
  withPayload?: Scalars['Boolean']['input'];
  withVector?: Scalars['Boolean']['input'];
};

export type SemanticSearchInput = {
  collectionName?: Scalars['String']['input'];
  documentType?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
  threshold?: Scalars['Float']['input'];
};

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

export type Tenant = {
  __typename?: 'Tenant';
  _count: TenantCount;
  chatTableName?: Maybe<Scalars['String']['output']>;
  collectionName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  distance: DistanceMetric;
  documentTableName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isApprove: Scalars['Boolean']['output'];
  keywordDailies?: Maybe<Array<Keyword_Daily>>;
  keywords?: Maybe<Array<Keywords>>;
  name: Scalars['String']['output'];
  nanoid: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type TenantCount = {
  __typename?: 'TenantCount';
  keywordDailies: Scalars['Int']['output'];
  keywords: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type TenantNullableScalarRelationFilter = {
  is?: InputMaybe<TenantWhereInput>;
  isNot?: InputMaybe<TenantWhereInput>;
};

export type TenantWhereInput = {
  AND?: InputMaybe<Array<TenantWhereInput>>;
  NOT?: InputMaybe<Array<TenantWhereInput>>;
  OR?: InputMaybe<Array<TenantWhereInput>>;
  chatTableName?: InputMaybe<StringNullableFilter>;
  collectionName?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  distance?: InputMaybe<EnumDistanceMetricFilter>;
  documentTableName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  isApprove?: InputMaybe<BoolFilter>;
  keywordDailies?: InputMaybe<Keyword_DailyListRelationFilter>;
  keywords?: InputMaybe<KeywordsListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  nanoid?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntNullableFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type UpsertDepartmentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpsertPointsInput = {
  collectionName: Scalars['String']['input'];
  points: Array<QdrantPointInput>;
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
  tenant?: Maybe<Tenant>;
  tenantId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserList = {
  __typename?: 'UserList';
  data: Array<Profile>;
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
  tenant?: InputMaybe<TenantNullableScalarRelationFilter>;
  tenantId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updatedBy?: InputMaybe<StringNullableFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Keyword_Daily = {
  __typename?: 'keyword_daily';
  count?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  keyword: Scalars['String']['output'];
  tenant?: Maybe<Tenant>;
  tenantId?: Maybe<Scalars['String']['output']>;
};

export type Keyword_DailyWhereInput = {
  AND?: InputMaybe<Array<Keyword_DailyWhereInput>>;
  NOT?: InputMaybe<Array<Keyword_DailyWhereInput>>;
  OR?: InputMaybe<Array<Keyword_DailyWhereInput>>;
  count?: InputMaybe<IntNullableFilter>;
  date?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  keyword?: InputMaybe<StringFilter>;
  tenant?: InputMaybe<TenantNullableScalarRelationFilter>;
  tenantId?: InputMaybe<StringNullableFilter>;
};

export type Keywords = {
  __typename?: 'keywords';
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  keyword: Scalars['String']['output'];
  tenant?: Maybe<Tenant>;
  tenantId?: Maybe<Scalars['String']['output']>;
};

export type KeywordsWhereInput = {
  AND?: InputMaybe<Array<KeywordsWhereInput>>;
  NOT?: InputMaybe<Array<KeywordsWhereInput>>;
  OR?: InputMaybe<Array<KeywordsWhereInput>>;
  count?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  keyword?: InputMaybe<StringFilter>;
  tenant?: InputMaybe<TenantNullableScalarRelationFilter>;
  tenantId?: InputMaybe<StringNullableFilter>;
};
