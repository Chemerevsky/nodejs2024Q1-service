import { Module } from '@nestjs/common';
import { AlbumsController } from '../controllers/albums.controller';
import { AlbumsService } from '../services/albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumModule {}
