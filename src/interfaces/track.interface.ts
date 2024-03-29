export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface TrackResponse {
  isError: boolean;
  data?: Track;
  errorMessage?: string;
  statusCode?: number;
}
