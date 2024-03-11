export interface Artist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

export interface ArtistResponse {
    isError: boolean,
    data?: Artist,
    errorMessage?: string,
    statusCode?: number
}