import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  name?: string;

  @IsBoolean()
  grammy?: boolean;
}
