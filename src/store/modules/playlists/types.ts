import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type PlaylistsAction = ActionType<typeof actions>;

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface PlaylistOwner {
  display_name: string;
  external_urls: {
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Playlist {
  collaborative: false;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface Playlists {
  message: string;
  playlists: {
    items: Playlist[];
    limit: number;
    next: number | null;
    offset: number;
    previous: number | null;
    total: number;
  };
}

export interface TypedFilters {
  id: string;
  name: string;
  validation: {
    primitiveType: string;
    min?: number;
    max?: number;
    entityType?: string;
    pattern?: string;
  };
}

export interface SelectFilters {
  id: string;
  name: string;
  values: Array<{
    label: string;
    value: string;
  }>;
}

export interface FilterDTO {
  id: string;
  name: string;
  validation?: {
    primitiveType: string;
    min?: number;
    max?: number;
    entityType?: string;
    pattern?: string;
  };
  values?: Array<{
    name: string;
    value: string;
  }>;
}

export type FiltersDTO = FilterDTO[];

export type FetchStatus = 'notFetched' | 'fetching' | 'fetched' | 'error';

export interface PlaylistsState {
  readonly playlists: Playlists | null;
  readonly filters: {
    selectFilters: SelectFilters[];
    typedFilters: TypedFilters[];
  } | null;
  readonly fetchPlaylistsStatus: FetchStatus;
}

export interface FiltersState {
  locale?: string;
  country?: string;
  offset: number;
  timestamp?: string;
  limit: number;
}
