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
  /** The multiplier path scalar represents a valid GraphQL multiplier path string. */
  MultiplierPath: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums?: Maybe<Array<Maybe<Album>>>;
  artist?: Maybe<Artist>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  health?: Maybe<Health>;
};


export type QueryAlbumArgs = {
  id: Scalars['Int'];
};


export type QueryArtistArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArtist?: Maybe<Artist>;
  deleteAlbum?: Maybe<Album>;
  updateArtist?: Maybe<Artist>;
};


export type MutationCreateArtistArgs = {
  input?: Maybe<CreateArtistInput>;
};


export type MutationDeleteAlbumArgs = {
  input?: Maybe<DeleteAlbumInput>;
};


export type MutationUpdateArtistArgs = {
  input?: Maybe<UpdateArtistInput>;
};


export type Artist = {
  __typename?: 'Artist';
  albums?: Maybe<Array<Maybe<Album>>>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  totalRevenue: Scalars['Float'];
};

export type Album = {
  __typename?: 'Album';
  artist?: Maybe<Artist>;
  artistId: Scalars['Int'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  releaseDate: Scalars['DateTime'];
};

export type Health = {
  __typename?: 'Health';
  apiStatus?: Maybe<Scalars['String']>;
};

export type CreateArtistInput = {
  name?: Maybe<Scalars['String']>;
};

export type UpdateArtistInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type DeleteAlbumInput = {
  albumId: Scalars['Int'];
};


export type GetArtistQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetArtistQuery = (
  { __typename?: 'Query' }
  & { artist?: Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
    & { albums?: Maybe<Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'id' | 'name' | 'releaseDate'>
    )>>> }
  )> }
);

export type GetArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtistsQuery = (
  { __typename?: 'Query' }
  & { artists?: Maybe<Array<Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
    & { albums?: Maybe<Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'id' | 'name'>
    )>>> }
  )>>> }
);

export type CreateArtistMutationVariables = Exact<{
  artist: CreateArtistInput;
}>;


export type CreateArtistMutation = (
  { __typename?: 'Mutation' }
  & { createArtist?: Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
  )> }
);

export type DeleteAlbumMutationVariables = Exact<{
  album: DeleteAlbumInput;
}>;


export type DeleteAlbumMutation = (
  { __typename?: 'Mutation' }
  & { deleteAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name'>
  )> }
);

export type GetHealthQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthQuery = (
  { __typename?: 'Query' }
  & { health?: Maybe<(
    { __typename?: 'Health' }
    & Pick<Health, 'apiStatus'>
  )> }
);

export type UpdateArtistMutationVariables = Exact<{
  artist: UpdateArtistInput;
}>;


export type UpdateArtistMutation = (
  { __typename?: 'Mutation' }
  & { updateArtist?: Maybe<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name'>
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
    mutation CreateArtist($artist: CreateArtistInput!) {
  createArtist(input: $artist) {
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
    mutation DeleteAlbum($album: DeleteAlbumInput!) {
  deleteAlbum(input: $album) {
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
    mutation UpdateArtist($artist: UpdateArtistInput!) {
  updateArtist(input: $artist) {
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