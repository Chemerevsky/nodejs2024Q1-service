import { Module } from '@nestjs/common';
import { ArtistsController } from '../controllers/artists.controller';
import { ArtistsService } from '../services/artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistModule {}
