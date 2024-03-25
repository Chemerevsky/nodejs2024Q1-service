import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackDto, UpdateTrackDto } from '../dto/tracks.dto';
import { Track } from '../entities/track.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = new Track();
    newTrack.name = createTrackDto.name;
    newTrack.duration = createTrackDto.duration;
    newTrack.albumId = createTrackDto.albumId ? createTrackDto.albumId : null;
    newTrack.artistId = createTrackDto.artistId
      ? createTrackDto.artistId
      : null;

    return this.tracksRepository.save(newTrack);
  }

  findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  findOne(id: string): Promise<Track | null> {
    return this.tracksRepository.findOneBy({ id });
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<UpdateResult> {
    return this.tracksRepository.update({ id: id }, { ...updateTrackDto });
  }

  async remove(id: string): Promise<void> {
    await this.tracksRepository.delete(id);
  }
}
