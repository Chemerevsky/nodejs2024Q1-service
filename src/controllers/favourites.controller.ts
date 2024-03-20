import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpException,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavouritesService } from '../services/favourites.service';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../services/artists.service';
import { AlbumsService } from '../services/albums.service';
import {
  FavoritesGetAllResponse,
} from '../interfaces/favorites.interface';
import { Track } from '../interfaces/track.interface';
import { Artist } from '../interfaces/artist.interface';
import { Album } from '../interfaces/album.interface';

@Controller('favs')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<FavoritesGetAllResponse> {
    return this.favouritesService.findAll();
  }

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.addEntityToFavorites('tracks', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.removeEntityFromFavorites('tracks', id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.addEntityToFavorites('artists', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.removeEntityFromFavorites('artists', id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.addEntityToFavorites('albums', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavorites(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.removeEntityFromFavorites('albums', id);
  }

  async addEntityToFavorites(type: string, id: string) {
    let entity: Track | Artist | Album;
    let entityname;
    switch(type) {
      case 'tracks':
        entity = await this.tracksService.findOne(id);
        entityname = 'Track';
        break;
      case 'artists':
        entity = await this.artistsService.findOne(id);
        entityname = 'Artist';
        break;
      case 'albums':
        entity = await this.albumsService.findOne(id);
        entityname = 'Album';
        break;
    }

    if (!entity) {
      throw new HttpException(`${entityname} with that id does not exist`, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favouritesService.addToFavorites(type, entity);
  }

  async removeEntityFromFavorites(type: string, id: string) {
    const entity = await this.favouritesService.findEntityById(type, id);
    if (!entity) {
      let entityname;
      switch(type) {
        case 'tracks':
          entityname = 'Track';
          break;
        case 'artists':
          entityname = 'Artist';
          break;
        case 'albums':
          entityname = 'Album';
          break;
      }
      throw new HttpException(`${entityname} is not in favorites`, HttpStatus.NOT_FOUND);
    }

    return this.favouritesService.remove(type, entity);
  }
}
