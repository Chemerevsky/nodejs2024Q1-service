import { Injectable, HttpStatus } from '@nestjs/common';
import { Album, AlbumResponse } from '../interfaces/album.interface';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/albums.dto';
import { validate, v4 as createUuid } from 'uuid';

@Injectable()
export class AlbumsService {
    private readonly albums: Album[] = [];

    create(createAlbumDto: CreateAlbumDto): AlbumResponse {
        if (!createAlbumDto.name) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Name is required'
            }
        }

        if (!createAlbumDto.year) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Year is required'
            }
        }

        if (createAlbumDto.artistId === undefined) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'ArtistId should be defined'
            }
        }

        const newAlbum: Album = {
            id: createUuid(),
            name: createAlbumDto.name,
            year: createAlbumDto.year,
            artistId: createAlbumDto.artistId,
        };
        this.albums.push(newAlbum);

        return {
            isError: false
        }
    }

    findAll(): Album[] {
        return this.albums;
    }

    findById(id: string): AlbumResponse {
        const isValidId: boolean = validate(id);
        if (!isValidId) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const album: Album = this.albums.find(t => t.id === id);
        if (!album) {
            return {
                isError: true,
                errorMessage: 'Album was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        return {
            data: album,
            isError: false
        };
    }

    update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const album: Album = this.albums.find(u => u.id === id);
        if (!album) {
            return {
                isError: true,
                errorMessage: 'Album was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        for (const property in updateAlbumDto) {
            album[property] = updateAlbumDto[property];
        }

        return {
            isError: false
        }
    }

    delete(id: string): AlbumResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const album: Album = this.albums.find(u => u.id === id);
        if (!album) {
            return {
                isError: true,
                errorMessage: 'Album was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        this.albums.splice(this.albums.indexOf(album), 1);

        return {
            isError: false
        }
    }
}