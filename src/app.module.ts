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

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UsersController, TracksController, ArtistsController],
  providers: [AppService, UsersService, TracksService, ArtistsService],
})
export class AppModule {}
