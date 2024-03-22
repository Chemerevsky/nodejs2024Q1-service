import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { Album } from '../interfaces/album.interface';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  async create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (!createAlbumDto.name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    if (!createAlbumDto.year) {
      throw new HttpException('Duration is required', HttpStatus.BAD_REQUEST);
    }

    if (!createAlbumDto.artistId === undefined) {
      throw new HttpException('ArtistId should be defined', HttpStatus.BAD_REQUEST);
    }

    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    await this.albumsService.update(id, updateAlbumDto);

    return this.albumsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return this.albumsService.remove(id);
  }
}
