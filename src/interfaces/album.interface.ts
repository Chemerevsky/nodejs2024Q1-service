export interface Album {
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export interface AlbumResponse {
    isError: boolean,
    data?: Album,
    errorMessage?: string,
    statusCode?: number
}