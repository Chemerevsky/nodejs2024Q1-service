import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpCode } from '@nestjs/common';
import { TracksService } from '../services/tracks.service';
import { Track, TrackResponse } from '../interfaces/track.interface';
import { CreateTrackDto, UpdateTrackDto } from '../dto/tracks.dto';

@Controller('track')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    async findAll(): Promise<Track[]> {
        return this.tracksService.findAll();
    }

   @Get(':id')
    async findById(@Param('id') id: string): Promise<Track> {
        const trackResponse: TrackResponse = this.tracksService.findById(id);
        if (trackResponse.isError) {
            throw new HttpException(trackResponse.errorMessage, trackResponse.statusCode);
        }

        return trackResponse.data;
    }

    @Post()
    async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
        const trackResponse: TrackResponse = this.tracksService.create(createTrackDto);
        if (trackResponse.isError) {
            throw new HttpException(trackResponse.errorMessage, trackResponse.statusCode);
        }

        return trackResponse.data;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
        const trackResponse: TrackResponse = this.tracksService.update(id, updateTrackDto);
        if (trackResponse.isError) {
            throw new HttpException(trackResponse.errorMessage, trackResponse.statusCode);
        }

        return trackResponse.data;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string) {
        const trackResponse: TrackResponse  = this.tracksService.delete(id);
        if (trackResponse.isError) {
            throw new HttpException(trackResponse.errorMessage, trackResponse.statusCode);
        }
    }
}