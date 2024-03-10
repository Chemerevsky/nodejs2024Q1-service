export class CreateTrackDto {
    name: string;
    duration: number;
    artistId?: string;
    albumId?: string;
}

export class UpdateTrackDto {
    name?: string;
    duration?: number;
    artistId?: string;
    albumId?: string;
}