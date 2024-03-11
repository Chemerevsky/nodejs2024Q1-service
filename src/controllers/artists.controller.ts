import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpCode } from '@nestjs/common';
import { ArtistsService } from '../services/artists.service';
import { Artist, ArtistResponse } from '../interfaces/artist.interface';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artists.dto';

@Controller('artist')
export class ArtistsController {
    constructor(private artistsService: ArtistsService) {}

    @Get()
    async findAll(): Promise<Artist[]> {
        return this.artistsService.findAll();
    }

   @Get(':id')
    async findById(@Param('id') id: string): Promise<Artist> {
        const artistResponse: ArtistResponse = this.artistsService.findById(id);
        if (artistResponse.isError) {
            throw new HttpException(artistResponse.errorMessage, artistResponse.statusCode);
        }

        return artistResponse.data;
    }

    @Post()
    async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
        const artistResponse: ArtistResponse = this.artistsService.create(createArtistDto);
        if (artistResponse.isError) {
            throw new HttpException(artistResponse.errorMessage, artistResponse.statusCode);
        }

        return artistResponse.data;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto): Promise<Artist>  {
        const artistResponse: ArtistResponse = this.artistsService.update(id, updateArtistDto);
        if (artistResponse.isError) {
            throw new HttpException(artistResponse.errorMessage, artistResponse.statusCode);
        }

        return artistResponse.data;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string) {
        const artistResponse: ArtistResponse  = this.artistsService.delete(id);
        if (artistResponse.isError) {
            throw new HttpException(artistResponse.errorMessage, artistResponse.statusCode);
        }
    }
}