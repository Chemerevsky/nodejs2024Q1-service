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
import { ArtistsService } from '../services/artists.service';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  async create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto): Promise<Artist> {
    if (!createArtistDto.name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    if (createArtistDto.grammy === undefined) {
      throw new HttpException('Grammy is required', HttpStatus.BAD_REQUEST);
    }

    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }

    await this.artistsService.update(id, updateArtistDto);

    return this.artistsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistsService.findOne(id);
    if (!artist) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }

    return this.artistsService.remove(id);
  }
}
