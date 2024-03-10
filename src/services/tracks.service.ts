import { Injectable, HttpStatus } from '@nestjs/common';
import { Track, TrackResponse } from '../interfaces/track.interface';
import { CreateTrackDto, UpdateTrackDto } from '../dto/tracks.dto';
import { validate, v4 as createUuid } from 'uuid';

@Injectable()
export class TracksService {
    private readonly tracks: Track[] = [];

    create(createTrackDto: CreateTrackDto): TrackResponse {
        if (!createTrackDto.name) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Name is required'
            }
        }

        if (!createTrackDto.duration) {
            return {
                isError: true,
                statusCode: HttpStatus.BAD_REQUEST,
                errorMessage: 'Duration is required'
            }
        }

        const newTrack: Track = {
            id: createUuid(),
            name: createTrackDto.name,
            duration: createTrackDto.duration,
            albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
            artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
        };
        this.tracks.push(newTrack);

        return {
            isError: false
        }
    }

    findAll(): Track[] {
        return this.tracks;
    }

    findById(id: string): TrackResponse {
        const isValidId: boolean = validate(id);
        if (!isValidId) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const track: Track = this.tracks.find(t => t.id === id);
        if (!track) {
            return {
                isError: true,
                errorMessage: 'Track was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        return {
            data: track,
            isError: false
        };
    }

    update(id: string, updateTrackDto: UpdateTrackDto): TrackResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const track: Track = this.tracks.find(u => u.id === id);
        if (!track) {
            return {
                isError: true,
                errorMessage: 'Track was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        for (const property in updateTrackDto) {
            track[property] = updateTrackDto[property];
        }

        return {
            isError: false
        }
    }

    delete(id: string): TrackResponse {
        if (!validate(id)) {
            return {
                isError: true,
                errorMessage: 'Id is invalid',
                statusCode: HttpStatus.BAD_REQUEST
            };
        }

        const track: Track = this.tracks.find(u => u.id === id);
        if (!track) {
            return {
                isError: true,
                errorMessage: 'Track was not found',
                statusCode: HttpStatus.NOT_FOUND
            };
        }

        this.tracks.splice(this.tracks.indexOf(track), 1);

        return {
            isError: false
        }
    }
}