import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, useInfiniteQuery, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: any;
};

export type AddSessionInput = {
  abstract?: InputMaybe<Scalars['String']>;
  speakerIds: Array<Scalars['Int']>;
  title: Scalars['String'];
};

export type AddSessionPayload = {
  __typename?: 'AddSessionPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  session?: Maybe<Session>;
};

export type AddSpeakerInput = {
  bio?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  webSite?: InputMaybe<Scalars['String']>;
};

export type AddSpeakerPayload = {
  __typename?: 'AddSpeakerPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  speaker?: Maybe<Speaker>;
};

export type AddTrackInput = {
  name: Scalars['String'];
};

export type AddTrackPayload = {
  __typename?: 'AddTrackPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  track?: Maybe<Track>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type Attendee = Node & {
  __typename?: 'Attendee';
  emailAddress?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  sessions: Array<Session>;
  userName: Scalars['String'];
};

export type AttendeeFilterInput = {
  and?: InputMaybe<Array<AttendeeFilterInput>>;
  emailAddress?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AttendeeFilterInput>>;
  sessionsAttendees?: InputMaybe<ListFilterInputTypeOfSessionAttendeeFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

/** A connection to a list of items. */
export type AttendeesConnection = {
  __typename?: 'AttendeesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AttendeesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Attendee>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AttendeesEdge = {
  __typename?: 'AttendeesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Attendee;
};

export type AuthorizeDirective = {
  __typename?: 'AuthorizeDirective';
  apply: ApplyPolicy;
  policy?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Scalars['String']>>;
};

export type CheckInAttendeeInput = {
  attendeeId: Scalars['Int'];
  sessionId: Scalars['Int'];
};

export type CheckInAttendeePayload = {
  __typename?: 'CheckInAttendeePayload';
  attendee?: Maybe<Attendee>;
  errors?: Maybe<Array<UserError>>;
  query: Query;
  session?: Maybe<Session>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfDateTimeOffsetOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableTimeSpanOperationFilterInput = {
  eq?: InputMaybe<Scalars['TimeSpan']>;
  gt?: InputMaybe<Scalars['TimeSpan']>;
  gte?: InputMaybe<Scalars['TimeSpan']>;
  in?: InputMaybe<Array<Scalars['TimeSpan']>>;
  lt?: InputMaybe<Scalars['TimeSpan']>;
  lte?: InputMaybe<Scalars['TimeSpan']>;
  neq?: InputMaybe<Scalars['TimeSpan']>;
  ngt?: InputMaybe<Scalars['TimeSpan']>;
  ngte?: InputMaybe<Scalars['TimeSpan']>;
  nin?: InputMaybe<Array<Scalars['TimeSpan']>>;
  nlt?: InputMaybe<Scalars['TimeSpan']>;
  nlte?: InputMaybe<Scalars['TimeSpan']>;
};

export type DeleteSpeakerInput = {
  id: Scalars['Int'];
};

export type DeleteSpeakerPayload = {
  __typename?: 'DeleteSpeakerPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  speaker?: Maybe<Speaker>;
};

export type Health = {
  __typename?: 'Health';
  apiStatus: Scalars['String'];
  databaseStatus: Scalars['String'];
};

export type ListFilterInputTypeOfSessionAttendeeFilterInput = {
  all?: InputMaybe<SessionAttendeeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SessionAttendeeFilterInput>;
  some?: InputMaybe<SessionAttendeeFilterInput>;
};

export type ListFilterInputTypeOfSessionFilterInput = {
  all?: InputMaybe<SessionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SessionFilterInput>;
  some?: InputMaybe<SessionFilterInput>;
};

export type ListFilterInputTypeOfSessionSpeakerFilterInput = {
  all?: InputMaybe<SessionSpeakerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SessionSpeakerFilterInput>;
  some?: InputMaybe<SessionSpeakerFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSession: AddSessionPayload;
  addSpeaker: AddSpeakerPayload;
  addTrack: AddTrackPayload;
  checkInAttendee: CheckInAttendeePayload;
  deleteSpeaker: DeleteSpeakerPayload;
  registerAttendee: RegisterAttendeePayload;
  renameTrack: RenameTrackPayload;
  scheduleSession: ScheduleSessionPayload;
  updateSpeaker: UpdateSpeakerPayload;
};


export type MutationAddSessionArgs = {
  input: AddSessionInput;
};


export type MutationAddSpeakerArgs = {
  input: AddSpeakerInput;
};


export type MutationAddTrackArgs = {
  input: AddTrackInput;
};


export type MutationCheckInAttendeeArgs = {
  input: CheckInAttendeeInput;
};


export type MutationDeleteSpeakerArgs = {
  input: DeleteSpeakerInput;
};


export type MutationRegisterAttendeeArgs = {
  input: RegisterAttendeeInput;
};


export type MutationRenameTrackArgs = {
  input: RenameTrackInput;
};


export type MutationScheduleSessionArgs = {
  input: ScheduleSessionInput;
};


export type MutationUpdateSpeakerArgs = {
  input: UpdateSpeakerInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  attendeeById: Attendee;
  attendees?: Maybe<AttendeesConnection>;
  attendeesById: Array<Attendee>;
  health: Health;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  sessionById: Session;
  sessions?: Maybe<SessionsConnection>;
  sessionsById: Array<Session>;
  speakerById: Speaker;
  speakers?: Maybe<SpeakersConnection>;
  speakersById: Array<Speaker>;
  trackById: Track;
  trackByName: Track;
  trackByNames: Array<Track>;
  tracks?: Maybe<TracksConnection>;
  tracksById: Array<Track>;
};


export type QueryAttendeeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAttendeesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryAttendeesByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QuerySessionByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySessionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<SessionSortInput>>;
  where?: InputMaybe<SessionFilterInput>;
};


export type QuerySessionsByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QuerySpeakerByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySpeakersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySpeakersByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryTrackByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTrackByNameArgs = {
  name: Scalars['String'];
};


export type QueryTrackByNamesArgs = {
  names: Array<Scalars['String']>;
};


export type QueryTracksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTracksByIdArgs = {
  ids: Array<Scalars['ID']>;
};

export type RegisterAttendeeInput = {
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userName: Scalars['String'];
};

export type RegisterAttendeePayload = {
  __typename?: 'RegisterAttendeePayload';
  attendee?: Maybe<Attendee>;
  errors?: Maybe<Array<UserError>>;
  query: Query;
};

export type RenameTrackInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type RenameTrackPayload = {
  __typename?: 'RenameTrackPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  track?: Maybe<Track>;
};

export type ScheduleSessionInput = {
  endTime: Scalars['DateTime'];
  sessionId: Scalars['Int'];
  startTime: Scalars['DateTime'];
  trackId: Scalars['Int'];
};

export type ScheduleSessionPayload = {
  __typename?: 'ScheduleSessionPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  session?: Maybe<Session>;
  speakers?: Maybe<Array<Speaker>>;
  track?: Maybe<Track>;
};

export type Session = Node & {
  __typename?: 'Session';
  abstract?: Maybe<Scalars['String']>;
  attendees: Array<Attendee>;
  duration: Scalars['TimeSpan'];
  endTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  speakers: Array<Speaker>;
  startTime?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  track?: Maybe<Track>;
  trackId?: Maybe<Scalars['ID']>;
};

export type SessionAttendeeCheckIn = {
  __typename?: 'SessionAttendeeCheckIn';
  attendee: Attendee;
  attendeeId: Scalars['ID'];
  checkInCount: Scalars['Int'];
  session: Session;
  sessionId: Scalars['ID'];
};

export type SessionAttendeeFilterInput = {
  and?: InputMaybe<Array<SessionAttendeeFilterInput>>;
  attendee?: InputMaybe<AttendeeFilterInput>;
  attendeeId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<SessionAttendeeFilterInput>>;
  session?: InputMaybe<SessionFilterInput>;
  sessionId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type SessionFilterInput = {
  abstract?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<SessionFilterInput>>;
  duration?: InputMaybe<ComparableTimeSpanOperationFilterInput>;
  endTime?: InputMaybe<ComparableNullableOfDateTimeOffsetOperationFilterInput>;
  or?: InputMaybe<Array<SessionFilterInput>>;
  sessionAttendees?: InputMaybe<ListFilterInputTypeOfSessionAttendeeFilterInput>;
  sessionSpeakers?: InputMaybe<ListFilterInputTypeOfSessionSpeakerFilterInput>;
  startTime?: InputMaybe<ComparableNullableOfDateTimeOffsetOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  track?: InputMaybe<TrackFilterInput>;
};

export type SessionSortInput = {
  abstract?: InputMaybe<SortEnumType>;
  duration?: InputMaybe<SortEnumType>;
  endTime?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  startTime?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  track?: InputMaybe<TrackSortInput>;
  trackId?: InputMaybe<SortEnumType>;
};

export type SessionSpeakerFilterInput = {
  and?: InputMaybe<Array<SessionSpeakerFilterInput>>;
  or?: InputMaybe<Array<SessionSpeakerFilterInput>>;
  session?: InputMaybe<SessionFilterInput>;
  sessionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  speaker?: InputMaybe<SpeakerFilterInput>;
  speakerId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

/** A connection to a list of items. */
export type SessionsConnection = {
  __typename?: 'SessionsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SessionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Session>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SessionsEdge = {
  __typename?: 'SessionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Session;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Speaker = Node & {
  __typename?: 'Speaker';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sessions: Array<Session>;
  webSite?: Maybe<Scalars['String']>;
};

export type SpeakerFilterInput = {
  and?: InputMaybe<Array<SpeakerFilterInput>>;
  bio?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SpeakerFilterInput>>;
  sessionSpeakers?: InputMaybe<ListFilterInputTypeOfSessionSpeakerFilterInput>;
  webSite?: InputMaybe<StringOperationFilterInput>;
};

/** A connection to a list of items. */
export type SpeakersConnection = {
  __typename?: 'SpeakersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SpeakersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Speaker>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SpeakersEdge = {
  __typename?: 'SpeakersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Speaker;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAttendeeCheckedIn: SessionAttendeeCheckIn;
  onSessionScheduled: Session;
};


export type SubscriptionOnAttendeeCheckedInArgs = {
  sessionId: Scalars['ID'];
};

export type Track = Node & {
  __typename?: 'Track';
  id: Scalars['ID'];
  name: Scalars['String'];
  sessions?: Maybe<SessionsConnection>;
};


export type TrackSessionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TrackFilterInput = {
  and?: InputMaybe<Array<TrackFilterInput>>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TrackFilterInput>>;
  sessions?: InputMaybe<ListFilterInputTypeOfSessionFilterInput>;
};

export type TrackSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type TracksConnection = {
  __typename?: 'TracksConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TracksEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Track>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TracksEdge = {
  __typename?: 'TracksEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Track;
};

export type UpdateSpeakerInput = {
  bio?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  webSite?: InputMaybe<Scalars['String']>;
};

export type UpdateSpeakerPayload = {
  __typename?: 'UpdateSpeakerPayload';
  errors?: Maybe<Array<UserError>>;
  query: Query;
  speaker?: Maybe<Speaker>;
};

export type UserError = {
  __typename?: 'UserError';
  code: Scalars['String'];
  message: Scalars['String'];
};

export type AddSpeakerMutationVariables = Exact<{
  speaker: AddSpeakerInput;
}>;


export type AddSpeakerMutation = { __typename?: 'Mutation', addSpeaker: { __typename?: 'AddSpeakerPayload', speaker?: { __typename?: 'Speaker', id: string, name: string, bio?: string | null | undefined, webSite?: string | null | undefined } | null | undefined } };

export type DeleteSpeakerMutationVariables = Exact<{
  speaker: DeleteSpeakerInput;
}>;


export type DeleteSpeakerMutation = { __typename?: 'Mutation', deleteSpeaker: { __typename?: 'DeleteSpeakerPayload', speaker?: { __typename?: 'Speaker', id: string, name: string, bio?: string | null | undefined, webSite?: string | null | undefined } | null | undefined } };

export type GetSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionsQuery = { __typename?: 'Query', sessions?: { __typename?: 'SessionsConnection', nodes?: Array<{ __typename?: 'Session', title: string }> | null | undefined } | null | undefined };

export type GetSpecificSpeakerByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSpecificSpeakerByIdQuery = { __typename?: 'Query', speakerById: { __typename?: 'Speaker', id: string, name: string, bio?: string | null | undefined, webSite?: string | null | undefined } };

export type GetSpeakersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpeakersQuery = { __typename?: 'Query', speakers?: { __typename?: 'SpeakersConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, nodes?: Array<{ __typename?: 'Speaker', id: string, name: string, bio?: string | null | undefined, webSite?: string | null | undefined }> | null | undefined } | null | undefined };

export type GetHealthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthQuery = { __typename?: 'Query', health: { __typename?: 'Health', apiStatus: string, databaseStatus: string } };

export type UpdateSpeakerMutationVariables = Exact<{
  speaker: UpdateSpeakerInput;
}>;


export type UpdateSpeakerMutation = { __typename?: 'Mutation', updateSpeaker: { __typename?: 'UpdateSpeakerPayload', speaker?: { __typename?: 'Speaker', id: string, name: string, bio?: string | null | undefined, webSite?: string | null | undefined } | null | undefined } };


export const AddSpeakerDocument = `
    mutation AddSpeaker($speaker: AddSpeakerInput!) {
  addSpeaker(input: $speaker) {
    speaker {
      id
      name
      bio
      webSite
    }
  }
}
    `;
export const useAddSpeakerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddSpeakerMutation, TError, AddSpeakerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddSpeakerMutation, TError, AddSpeakerMutationVariables, TContext>(
      'AddSpeaker',
      (variables?: AddSpeakerMutationVariables) => fetcher<AddSpeakerMutation, AddSpeakerMutationVariables>(client, AddSpeakerDocument, variables, headers)(),
      options
    );
export const DeleteSpeakerDocument = `
    mutation DeleteSpeaker($speaker: DeleteSpeakerInput!) {
  deleteSpeaker(input: $speaker) {
    speaker {
      id
      name
      bio
      webSite
    }
  }
}
    `;
export const useDeleteSpeakerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteSpeakerMutation, TError, DeleteSpeakerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteSpeakerMutation, TError, DeleteSpeakerMutationVariables, TContext>(
      'DeleteSpeaker',
      (variables?: DeleteSpeakerMutationVariables) => fetcher<DeleteSpeakerMutation, DeleteSpeakerMutationVariables>(client, DeleteSpeakerDocument, variables, headers)(),
      options
    );
export const GetSessionsDocument = `
    query GetSessions {
  sessions {
    nodes {
      title
    }
  }
}
    `;
export const useGetSessionsQuery = <
      TData = GetSessionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetSessionsQueryVariables,
      options?: UseQueryOptions<GetSessionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSessionsQuery, TError, TData>(
      variables === undefined ? ['GetSessions'] : ['GetSessions', variables],
      fetcher<GetSessionsQuery, GetSessionsQueryVariables>(client, GetSessionsDocument, variables, headers),
      options
    );
export const useInfiniteGetSessionsQuery = <
      TData = GetSessionsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSessionsQueryVariables,
      client: GraphQLClient,
      variables?: GetSessionsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSessionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetSessionsQuery, TError, TData>(
      variables === undefined ? ['GetSessions.infinite'] : ['GetSessions.infinite', variables],
      (metaData) => fetcher<GetSessionsQuery, GetSessionsQueryVariables>(client, GetSessionsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const GetSpecificSpeakerByIdDocument = `
    query GetSpecificSpeakerById($id: ID!) {
  speakerById(id: $id) {
    id
    name
    bio
    webSite
  }
}
    `;
export const useGetSpecificSpeakerByIdQuery = <
      TData = GetSpecificSpeakerByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetSpecificSpeakerByIdQueryVariables,
      options?: UseQueryOptions<GetSpecificSpeakerByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSpecificSpeakerByIdQuery, TError, TData>(
      ['GetSpecificSpeakerById', variables],
      fetcher<GetSpecificSpeakerByIdQuery, GetSpecificSpeakerByIdQueryVariables>(client, GetSpecificSpeakerByIdDocument, variables, headers),
      options
    );
export const useInfiniteGetSpecificSpeakerByIdQuery = <
      TData = GetSpecificSpeakerByIdQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSpecificSpeakerByIdQueryVariables,
      client: GraphQLClient,
      variables: GetSpecificSpeakerByIdQueryVariables,
      options?: UseInfiniteQueryOptions<GetSpecificSpeakerByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetSpecificSpeakerByIdQuery, TError, TData>(
      ['GetSpecificSpeakerById.infinite', variables],
      (metaData) => fetcher<GetSpecificSpeakerByIdQuery, GetSpecificSpeakerByIdQueryVariables>(client, GetSpecificSpeakerByIdDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const GetSpeakersDocument = `
    query GetSpeakers {
  speakers {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      name
      bio
      webSite
    }
  }
}
    `;
export const useGetSpeakersQuery = <
      TData = GetSpeakersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetSpeakersQueryVariables,
      options?: UseQueryOptions<GetSpeakersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSpeakersQuery, TError, TData>(
      variables === undefined ? ['GetSpeakers'] : ['GetSpeakers', variables],
      fetcher<GetSpeakersQuery, GetSpeakersQueryVariables>(client, GetSpeakersDocument, variables, headers),
      options
    );
export const useInfiniteGetSpeakersQuery = <
      TData = GetSpeakersQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSpeakersQueryVariables,
      client: GraphQLClient,
      variables?: GetSpeakersQueryVariables,
      options?: UseInfiniteQueryOptions<GetSpeakersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetSpeakersQuery, TError, TData>(
      variables === undefined ? ['GetSpeakers.infinite'] : ['GetSpeakers.infinite', variables],
      (metaData) => fetcher<GetSpeakersQuery, GetSpeakersQueryVariables>(client, GetSpeakersDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const GetHealthDocument = `
    query GetHealth {
  health {
    apiStatus
    databaseStatus
  }
}
    `;
export const useGetHealthQuery = <
      TData = GetHealthQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetHealthQueryVariables,
      options?: UseQueryOptions<GetHealthQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetHealthQuery, TError, TData>(
      variables === undefined ? ['GetHealth'] : ['GetHealth', variables],
      fetcher<GetHealthQuery, GetHealthQueryVariables>(client, GetHealthDocument, variables, headers),
      options
    );
export const useInfiniteGetHealthQuery = <
      TData = GetHealthQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetHealthQueryVariables,
      client: GraphQLClient,
      variables?: GetHealthQueryVariables,
      options?: UseInfiniteQueryOptions<GetHealthQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useInfiniteQuery<GetHealthQuery, TError, TData>(
      variables === undefined ? ['GetHealth.infinite'] : ['GetHealth.infinite', variables],
      (metaData) => fetcher<GetHealthQuery, GetHealthQueryVariables>(client, GetHealthDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      options
    );

export const UpdateSpeakerDocument = `
    mutation UpdateSpeaker($speaker: UpdateSpeakerInput!) {
  updateSpeaker(input: $speaker) {
    speaker {
      id
      name
      bio
      webSite
    }
  }
}
    `;
export const useUpdateSpeakerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateSpeakerMutation, TError, UpdateSpeakerMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateSpeakerMutation, TError, UpdateSpeakerMutationVariables, TContext>(
      'UpdateSpeaker',
      (variables?: UpdateSpeakerMutationVariables) => fetcher<UpdateSpeakerMutation, UpdateSpeakerMutationVariables>(client, UpdateSpeakerDocument, variables, headers)(),
      options
    );