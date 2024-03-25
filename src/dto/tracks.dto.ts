import { IsString, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  artistId?: string;

  @IsString()
  albumId?: string;
}

export class UpdateTrackDto {
  @IsString()
  name?: string;

  @IsNumber()
  duration?: number;

  @IsString()
  artistId?: string;

  @IsString()
  albumId?: string;
}
