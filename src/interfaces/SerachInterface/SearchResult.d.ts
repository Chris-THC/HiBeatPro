export interface SearchResult {
  type: string;
  videoId?: string;
  name: string;
  artist?: Artist;
  album?: Album;
  duration?: number;
  thumbnails: Thumbnail[];
  albumId?: string;
  playlistId?: string;
  year?: number;
  artistId?: string;
}

interface Artist {
  name: string;
  artistId?: string;
}

interface Album {
  name: string;
  albumId: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
