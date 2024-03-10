import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UsersController, TracksController],
  providers: [AppService, UsersService, TracksService],
})
export class AppModule {}
