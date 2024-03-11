import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';
import { AlbumsController } from './controllers/albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UsersController, TracksController, ArtistsController, AlbumsController],
  providers: [AppService, UsersService, TracksService, ArtistsService, AlbumsService],
})
export class AppModule {}
