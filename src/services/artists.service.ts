import { Injectable, HttpStatus } from '@nestjs/common';
import { Artist, ArtistResponse } from '../interfaces/artist.interface';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artists.dto';
import { validate, v4 as createUuid } from 'uuid';

@Injectable()
export class ArtistsService {
    private readonly artists: Artist[] = [];

    create(createArtistDto: CreateArtistDto): ArtistResponse {
        if (!createArtistDto.name) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Name is required'
            }
        }

        if (createArtistDto.grammy === undefined) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Grammy is required'
            }
        }

        const newArtist: Artist = {
            id: createUuid(),
            name: createArtistDto.name,
            grammy: createArtistDto.grammy,
        };
        this.artists.push(newArtist);

        return {
            isError: false
        }
    }

    findAll(): Artist[] {
        return this.artists;
    }

    findById(id: string): ArtistResponse {
        const isValidId: boolean = validate(id);
        if (!isValidId) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const artist: Artist = this.artists.find(t => t.id === id);
        if (!artist) {
            return {
                isError: true,
                errorMessage: 'Artist was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        return {
            data: artist,
            isError: false
        };
    }

    update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const artist: Artist = this.artists.find(u => u.id === id);
        if (!artist) {
            return {
                isError: true,
                errorMessage: 'Artist was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        for (const property in updateArtistDto) {
            artist[property] = updateArtistDto[property];
        }

        return {
            isError: false
        }
    }

    delete(id: string): ArtistResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const artist: Artist = this.artists.find(u => u.id === id);
        if (!artist) {
            return {
                isError: true,
                errorMessage: 'Artist was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        this.artists.splice(this.artists.indexOf(artist), 1);

        return {
            isError: false
        }
    }
}