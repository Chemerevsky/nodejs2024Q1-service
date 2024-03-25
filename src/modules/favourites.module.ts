import { Module } from '@nestjs/common';
import { FavouritesController } from '../controllers/favourites.controller';
import { FavouritesService } from '../services/favourites.service';
import { ArtistsService } from '../services/artists.service';
import { AlbumsService } from '../services/albums.service';
import { TracksService } from '../services/tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService, ArtistsService, AlbumsService, TracksService],
})
export class FavouritesModule {}
