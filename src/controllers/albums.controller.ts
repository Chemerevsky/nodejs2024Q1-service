import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpCode } from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { Album, AlbumResponse } from '../interfaces/album.interface';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/albums.dto';

@Controller('album')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Get()
    async findAll(): Promise<Album[]> {
        return this.albumsService.findAll();
    }

   @Get(':id')
    async findById(@Param('id') id: string): Promise<Album> {
        const albumResponse: AlbumResponse = this.albumsService.findById(id);
        if (albumResponse.isError) {
            throw new HttpException(albumResponse.errorMessage, albumResponse.statusCode);
        }

        return albumResponse.data;
    }

    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
        const albumResponse: AlbumResponse = this.albumsService.create(createAlbumDto);
        if (albumResponse.isError) {
            throw new HttpException(albumResponse.errorMessage, albumResponse.statusCode);
        }

        return albumResponse.data;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const albumResponse: AlbumResponse = this.albumsService.update(id, updateAlbumDto);
        if (albumResponse.isError) {
            throw new HttpException(albumResponse.errorMessage, albumResponse.statusCode);
        }

        return albumResponse.data;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id: string) {
        const albumResponse: AlbumResponse  = this.albumsService.delete(id);
        if (albumResponse.isError) {
            throw new HttpException(albumResponse.errorMessage, albumResponse.statusCode);
        }
    }
}