import { Module } from '@nestjs/common';
import { TracksController } from '../controllers/tracks.controller';
import { TracksService } from '../services/tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TrackModule {}
