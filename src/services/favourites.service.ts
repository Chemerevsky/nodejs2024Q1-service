import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesGetAllResponse } from '../interfaces/favorites.interface';
import { Track } from '../interfaces/track.interface';
import { Artist } from '../interfaces/artist.interface';
import { Album } from '../interfaces/album.interface';
import { Favorite } from '../entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {
    this.favoritesRepository
      .findOne({
        where: {
          id: 1,
        },
      })
      .then((res) => {
        if (!res) {
          this.favoritesRepository.save(new Favorite());
        }
      });
  }

  async findAll(): Promise<FavoritesGetAllResponse> {
    // Find all favorites
    const favorites: Favorite[] = await this.favoritesRepository.find({
      relations: ['albums', 'artists', 'tracks'],
    });

    const allAlbums: Album[] = [];
    const allArtists: Artist[] = [];
    const allTracks: Track[] = [];

    favorites.forEach((favorite) => {
      allAlbums.push(...favorite.albums);
      allArtists.push(...favorite.artists);
      allTracks.push(...favorite.tracks);
    });

    return {
      albums: allAlbums,
      artists: allArtists,
      tracks: allTracks,
    };
  }

  async addToFavorites(type: string, entity: Track | Album | Artist) {
    const favEntity: Track | Album | Artist = await this.findEntityById(
      type,
      entity.id,
    );
    if (favEntity) {
      return;
    }

    await this.favoritesRepository
      .createQueryBuilder()
      .relation(Favorite, type)
      .of(1)
      .add(entity);
  }

  async findEntityById(
    type: string,
    id: string,
  ): Promise<Track | Album | Artist> {
    const entities: (Track | Album | Artist)[] = await this.favoritesRepository
      .createQueryBuilder()
      .relation(Favorite, type)
      .of(1)
      .loadMany();

    return entities.find((e) => e.id === id);
  }

  async remove(type: string, entity: Track | Album | Artist) {
    return await this.favoritesRepository
      .createQueryBuilder()
      .relation(Favorite, type)
      .of(1)
      .remove(entity);
  }
}
