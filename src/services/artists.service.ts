import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artists.dto';
import { Artist } from '../entities/artist.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = new Artist();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;
  
    return this.artistsRepository.save(newArtist);
  }

  findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  findOne(id: string): Promise<Artist | null> {
    return this.artistsRepository.findOneBy({ id });
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<UpdateResult> {
    return this.artistsRepository.update({id: id}, {...updateArtistDto});
  }

  async remove(id: string): Promise<void> {
    await this.artistsRepository.delete(id);
  }
}
