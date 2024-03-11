import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpCode } from '@nestjs/common';
import { FavouritesService } from '../services/favourites.service';
import { FavoritesGetAllResponse, FavoritesResponse } from '../interfaces/favorites.interface';

@Controller('favs')
export class FavouritesController {
    constructor(private favouritesService: FavouritesService) {}

    @Get()
    async findAll(): Promise<FavoritesGetAllResponse> {
        return this.favouritesService.findAll();
    }

    @Post('track/:id')
    async addTrackToFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.addToFavorites('track', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }

    @Post('album/:id')
    async addAlbumToFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.addToFavorites('album', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }

    @Post('artist/:id')
    async addArtistToFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.addToFavorites('artist', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }

    @Delete('track/:id')
    @HttpCode(204)
    async removeTrackFromFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.removeFromFavorites('track', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }

    @Delete('artist/:id')
    @HttpCode(204)
    async removeArtistFromFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.removeFromFavorites('artist', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }

    @Delete('album/:id')
    @HttpCode(204)
    async removeAlbumFromFavorites(@Param('id') id: string): Promise<FavoritesResponse> {
        const response: FavoritesResponse = this.favouritesService.removeFromFavorites('album', id);
        if (response.isError) {
            throw new HttpException(response.errorMessage, response.statusCode);
        }

        return response;
    }
}