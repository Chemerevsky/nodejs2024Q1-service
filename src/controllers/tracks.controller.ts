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
} from '@nestjs/common';
import { TracksService } from '../services/tracks.service';
import { Track } from '../interfaces/track.interface';
import { CreateTrackDto, UpdateTrackDto } from '../dto/tracks.dto';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    if (!createTrackDto.name) {
      throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }

    if (!createTrackDto.duration) {
      throw new HttpException('Duration is required', HttpStatus.BAD_REQUEST);
    }

    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }

    await this.tracksService.update(id, updateTrackDto);

    return this.tracksService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }

    return this.tracksService.remove(id);
  }
}
