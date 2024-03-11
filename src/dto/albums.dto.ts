export class CreateAlbumDto {
    name: string;
    year: number;
    artistId: string | null;
}

export class UpdateAlbumDto {
    name?: string;
    year?: number;
    artistId?: string | null;
}