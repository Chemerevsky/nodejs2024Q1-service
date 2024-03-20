import { Module } from '@nestjs/common';
import { FavouritesController } from '../controllers/favourites.controller';
import { FavouritesService } from '../services/favourites.service';
import { ArtistsService } from '../services/artists.service';
import { AlbumsService } from '../services/albums.service';
import { TracksService } from '../services/tracks.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, ArtistsService, AlbumsService, TracksService],
})
export class FavouritesModule {}
