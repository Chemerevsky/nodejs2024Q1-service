import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/albums.dto';
import { Album } from '../entities/album.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = new Album();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId ? createAlbumDto.artistId : null;
  
    return this.albumsRepository.save(newAlbum);
  }

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  findOne(id: string): Promise<Album | null> {
    return this.albumsRepository.findOneBy({ id });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<UpdateResult> {
    return this.albumsRepository.update({id: id}, {...updateAlbumDto});
  }

  async remove(id: string): Promise<void> {
    await this.albumsRepository.delete(id);
  }
}
