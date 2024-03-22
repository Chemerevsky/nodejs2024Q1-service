import { IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsString()
  name?: string;

  @IsNumber()
  year?: number;
  artistId?: string | null;
}
