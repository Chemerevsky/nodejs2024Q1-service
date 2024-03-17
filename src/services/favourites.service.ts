import { Injectable, HttpStatus } from '@nestjs/common';
import {
  Favorites,
  FavoritesGetAllResponse,
  FavoritesResponse,
} from '../interfaces/favorites.interface';
import { validate } from 'uuid';
import { TracksService } from './tracks.service';
import { ArtistsService } from './artists.service';
import { AlbumsService } from './albums.service';
import { Track, TrackResponse } from '../interfaces/track.interface';
import { Artist, ArtistResponse } from '../interfaces/artist.interface';
import { Album, AlbumResponse } from '../interfaces/album.interface';

@Injectable()
export class FavouritesService {
  /* constructor(
    private readonly trackService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  private readonly favourites: Favorites = {
    artists: [], // uuid like "c7dae647-7542-498e-9ec6-3ef720a51259" can be added to test get and delete actions
    albums: [],
    tracks: [],
  };

  findAll(): FavoritesGetAllResponse {
    const artists: Artist[] = this.artistsService.findByIds(
      this.favourites.artists,
    );
    const albums: Album[] = this.albumsService.findByIds(
      this.favourites.albums,
    );
    const tracks: Track[] = this.trackService.findByIds(this.favourites.tracks);

    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  addToFavorites(type: string, id: string): FavoritesResponse {
    if (!validate(id)) {
      return {
        isError: true,
        errorMessage: 'Id is invalid',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    switch (type) {
      case 'track':
        const trackResponse: TrackResponse = this.trackService.findById(id);
        if (!trackResponse.isError) {
          this.favourites.tracks.push(id);
        } else {
          trackResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
          return trackResponse;
        }
        break;
      case 'artist':
        const artistResponse: ArtistResponse = this.artistsService.findById(id);
        if (!artistResponse.isError) {
          this.favourites.artists.push(id);
        } else {
          artistResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
          return artistResponse;
        }
        break;
      case 'album':
        const albumResponse: AlbumResponse = this.albumsService.findById(id);
        if (!albumResponse.isError) {
          this.favourites.albums.push(id);
        } else {
          albumResponse.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
          return albumResponse;
        }
        break;
    }

    return {
      isError: false,
      message: `${type} was added to favourites`,
      statusCode: 201,
    };
  }

  removeFromFavorites(type: string, id: string): FavoritesResponse {
    if (!validate(id)) {
      return {
        isError: true,
        errorMessage: 'Id is invalid',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }

    switch (type) {
      case 'track':
        const tracks = this.favourites.tracks;
        const trackId: string = tracks.find((i) => i === id);
        if (trackId) {
          tracks.splice(tracks.indexOf(trackId), 1);
        } else {
          return this.getNotFoundError(type);
        }
        break;
      case 'artist':
        const artists = this.favourites.artists;
        const artistId: string = artists.find((i) => i === id);
        if (artistId) {
          artists.splice(artists.indexOf(artistId), 1);
        } else {
          return this.getNotFoundError(type);
        }
        break;
      case 'album':
        const albums = this.favourites.albums;
        const albumId: string = albums.find((i) => i === id);
        if (albumId) {
          albums.splice(albums.indexOf(albumId), 1);
        } else {
          return this.getNotFoundError(type);
        }
        break;
    }

    return {
      isError: false,
      message: `${type} was removed from favourites`,
    };
  }

  getNotFoundError(type: string) {
    return {
      isError: true,
      errorMessage: `${type} is not in favorites`,
      statusCode: HttpStatus.NOT_FOUND,
    };
  } */
}
