import { Artist } from './artist.interface';
import { Album } from './album.interface';
import { Track } from './track.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesGetAllResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoritesResponse {
  isError: boolean;
  errorMessage?: string;
  message?: string;
  statusCode?: number;
}
