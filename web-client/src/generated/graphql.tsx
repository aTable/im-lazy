import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Date` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  Date: any;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
  /** The `DateTimeOffset` scalar type represents a date, time and offset from UTC. `DateTimeOffset` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTimeOffset: any;
  /** The `Seconds` scalar type represents a period of time represented as the total number of seconds. */
  Seconds: any;
  /** The `Milliseconds` scalar type represents a period of time represented as the total number of milliseconds. */
  Milliseconds: any;
  Decimal: any;
};







export type MyGraphQuery = {
  __typename?: 'MyGraphQuery';
  album?: Maybe<AlbumType>;
  albums?: Maybe<Array<Maybe<AlbumType>>>;
  artist?: Maybe<ArtistType>;
  artists?: Maybe<Array<Maybe<ArtistType>>>;
  health?: Maybe<HealthType>;
};


export type MyGraphQueryAlbumArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MyGraphQueryArtistArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type HealthType = {
  __typename?: 'HealthType';
  apiStatus: Scalars['String'];
};

export type AlbumType = {
  __typename?: 'AlbumType';
  artist?: Maybe<ArtistType>;
  id: Scalars['Int'];
  name: Scalars['String'];
  releaseDate: Scalars['Date'];
};

export type ArtistType = {
  __typename?: 'ArtistType';
  /** albums */
  albums?: Maybe<Array<Maybe<AlbumType>>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  totalRevenue: Scalars['Float'];
};

export type MyGraphMutation = {
  __typename?: 'MyGraphMutation';
  createAlbum?: Maybe<AlbumType>;
  createArtist?: Maybe<ArtistType>;
  deleteAlbum?: Maybe<AlbumType>;
  updateArtist?: Maybe<ArtistType>;
};


export type MyGraphMutationCreateAlbumArgs = {
  album: AlbumInput;
};


export type MyGraphMutationCreateArtistArgs = {
  artist: ArtistInput;
};


export type MyGraphMutationDeleteAlbumArgs = {
  album: AlbumDeleteInput;
};


export type MyGraphMutationUpdateArtistArgs = {
  artist: ArtistUpdateInput;
};

export type AlbumInput = {
  name: Scalars['String'];
  releaseDate: Scalars['Date'];
  artistId: Scalars['Int'];
};

export type AlbumDeleteInput = {
  id: Scalars['Int'];
};

export type ArtistInput = {
  name: Scalars['String'];
};

export type ArtistUpdateInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetArtistQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetArtistQuery = (
  { __typename?: 'MyGraphQuery' }
  & { artist?: Maybe<(
    { __typename?: 'ArtistType' }
    & Pick<ArtistType, 'id' | 'name'>
    & { albums?: Maybe<Array<Maybe<(
      { __typename?: 'AlbumType' }
      & Pick<AlbumType, 'id' | 'name' | 'releaseDate'>
    )>>> }
  )> }
);

export type GetArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistsQuery = (
  { __typename?: 'MyGraphQuery' }
  & { artists?: Maybe<Array<Maybe<(
    { __typename?: 'ArtistType' }
    & Pick<ArtistType, 'id' | 'name'>
    & { albums?: Maybe<Array<Maybe<(
      { __typename?: 'AlbumType' }
      & Pick<AlbumType, 'id' | 'name'>
    )>>> }
  )>>> }
);

export type CreateArtistMutationVariables = Exact<{
  artist: ArtistInput;
}>;


export type CreateArtistMutation = (
  { __typename?: 'MyGraphMutation' }
  & { createArtist?: Maybe<(
    { __typename?: 'ArtistType' }
    & Pick<ArtistType, 'id' | 'name'>
  )> }
);

export type DeleteAlbumMutationVariables = Exact<{
  album: AlbumDeleteInput;
}>;


export type DeleteAlbumMutation = (
  { __typename?: 'MyGraphMutation' }
  & { deleteAlbum?: Maybe<(
    { __typename?: 'AlbumType' }
    & Pick<AlbumType, 'id' | 'name'>
  )> }
);

export type GetHealthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthQuery = (
  { __typename?: 'MyGraphQuery' }
  & { health?: Maybe<(
    { __typename?: 'HealthType' }
    & Pick<HealthType, 'apiStatus'>
  )> }
);

export type UpdateArtistMutationVariables = Exact<{
  artist: ArtistUpdateInput;
}>;


export type UpdateArtistMutation = (
  { __typename?: 'MyGraphMutation' }
  & { updateArtist?: Maybe<(
    { __typename?: 'ArtistType' }
    & Pick<ArtistType, 'id' | 'name'>
  )> }
);


export const GetArtistDocument = Apollo.gql`
    query GetArtist($id: Int!) {
  artist(id: $id) {
    id
    name
    albums {
      id
      name
      releaseDate
    }
  }
}
    `;

/**
 * __useGetArtistQuery__
 *
 * To run a query within a React component, call `useGetArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistQuery(baseOptions?: Apollo.QueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
        return Apollo.useQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, baseOptions);
      }
export function useGetArtistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtistQuery, GetArtistQueryVariables>) {
          return Apollo.useLazyQuery<GetArtistQuery, GetArtistQueryVariables>(GetArtistDocument, baseOptions);
        }
export type GetArtistQueryHookResult = ReturnType<typeof useGetArtistQuery>;
export type GetArtistLazyQueryHookResult = ReturnType<typeof useGetArtistLazyQuery>;
export type GetArtistQueryResult = Apollo.QueryResult<GetArtistQuery, GetArtistQueryVariables>;
export const GetArtistsDocument = Apollo.gql`
    query GetArtists {
  artists {
    id
    name
    albums {
      id
      name
    }
  }
}
    `;

/**
 * __useGetArtistsQuery__
 *
 * To run a query within a React component, call `useGetArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArtistsQuery(baseOptions?: Apollo.QueryHookOptions<GetArtistsQuery, GetArtistsQueryVariables>) {
        return Apollo.useQuery<GetArtistsQuery, GetArtistsQueryVariables>(GetArtistsDocument, baseOptions);
      }
export function useGetArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArtistsQuery, GetArtistsQueryVariables>) {
          return Apollo.useLazyQuery<GetArtistsQuery, GetArtistsQueryVariables>(GetArtistsDocument, baseOptions);
        }
export type GetArtistsQueryHookResult = ReturnType<typeof useGetArtistsQuery>;
export type GetArtistsLazyQueryHookResult = ReturnType<typeof useGetArtistsLazyQuery>;
export type GetArtistsQueryResult = Apollo.QueryResult<GetArtistsQuery, GetArtistsQueryVariables>;
export const CreateArtistDocument = Apollo.gql`
    mutation CreateArtist($artist: ArtistInput!) {
  createArtist(artist: $artist) {
    id
    name
  }
}
    `;
export type CreateArtistMutationFn = Apollo.MutationFunction<CreateArtistMutation, CreateArtistMutationVariables>;

/**
 * __useCreateArtistMutation__
 *
 * To run a mutation, you first call `useCreateArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArtistMutation, { data, loading, error }] = useCreateArtistMutation({
 *   variables: {
 *      artist: // value for 'artist'
 *   },
 * });
 */
export function useCreateArtistMutation(baseOptions?: Apollo.MutationHookOptions<CreateArtistMutation, CreateArtistMutationVariables>) {
        return Apollo.useMutation<CreateArtistMutation, CreateArtistMutationVariables>(CreateArtistDocument, baseOptions);
      }
export type CreateArtistMutationHookResult = ReturnType<typeof useCreateArtistMutation>;
export type CreateArtistMutationResult = Apollo.MutationResult<CreateArtistMutation>;
export type CreateArtistMutationOptions = Apollo.BaseMutationOptions<CreateArtistMutation, CreateArtistMutationVariables>;
export const DeleteAlbumDocument = Apollo.gql`
    mutation DeleteAlbum($album: AlbumDeleteInput!) {
  deleteAlbum(album: $album) {
    id
    name
  }
}
    `;
export type DeleteAlbumMutationFn = Apollo.MutationFunction<DeleteAlbumMutation, DeleteAlbumMutationVariables>;

/**
 * __useDeleteAlbumMutation__
 *
 * To run a mutation, you first call `useDeleteAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlbumMutation, { data, loading, error }] = useDeleteAlbumMutation({
 *   variables: {
 *      album: // value for 'album'
 *   },
 * });
 */
export function useDeleteAlbumMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>) {
        return Apollo.useMutation<DeleteAlbumMutation, DeleteAlbumMutationVariables>(DeleteAlbumDocument, baseOptions);
      }
export type DeleteAlbumMutationHookResult = ReturnType<typeof useDeleteAlbumMutation>;
export type DeleteAlbumMutationResult = Apollo.MutationResult<DeleteAlbumMutation>;
export type DeleteAlbumMutationOptions = Apollo.BaseMutationOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>;
export const GetHealthDocument = Apollo.gql`
    query GetHealth {
  health {
    apiStatus
  }
}
    `;

/**
 * __useGetHealthQuery__
 *
 * To run a query within a React component, call `useGetHealthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHealthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHealthQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHealthQuery(baseOptions?: Apollo.QueryHookOptions<GetHealthQuery, GetHealthQueryVariables>) {
        return Apollo.useQuery<GetHealthQuery, GetHealthQueryVariables>(GetHealthDocument, baseOptions);
      }
export function useGetHealthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHealthQuery, GetHealthQueryVariables>) {
          return Apollo.useLazyQuery<GetHealthQuery, GetHealthQueryVariables>(GetHealthDocument, baseOptions);
        }
export type GetHealthQueryHookResult = ReturnType<typeof useGetHealthQuery>;
export type GetHealthLazyQueryHookResult = ReturnType<typeof useGetHealthLazyQuery>;
export type GetHealthQueryResult = Apollo.QueryResult<GetHealthQuery, GetHealthQueryVariables>;
export const UpdateArtistDocument = Apollo.gql`
    mutation UpdateArtist($artist: ArtistUpdateInput!) {
  updateArtist(artist: $artist) {
    id
    name
  }
}
    `;
export type UpdateArtistMutationFn = Apollo.MutationFunction<UpdateArtistMutation, UpdateArtistMutationVariables>;

/**
 * __useUpdateArtistMutation__
 *
 * To run a mutation, you first call `useUpdateArtistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArtistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArtistMutation, { data, loading, error }] = useUpdateArtistMutation({
 *   variables: {
 *      artist: // value for 'artist'
 *   },
 * });
 */
export function useUpdateArtistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArtistMutation, UpdateArtistMutationVariables>) {
        return Apollo.useMutation<UpdateArtistMutation, UpdateArtistMutationVariables>(UpdateArtistDocument, baseOptions);
      }
export type UpdateArtistMutationHookResult = ReturnType<typeof useUpdateArtistMutation>;
export type UpdateArtistMutationResult = Apollo.MutationResult<UpdateArtistMutation>;
export type UpdateArtistMutationOptions = Apollo.BaseMutationOptions<UpdateArtistMutation, UpdateArtistMutationVariables>;