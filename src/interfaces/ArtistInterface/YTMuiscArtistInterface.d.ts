export interface ArtistFull {
  artistId: string;
  name: string;
  type: 'ARTIST';
  thumbnails: Thumbnail[];
  topSongs: Song[];
  topAlbums: AlbumSummary[];
  topSingles: AlbumSummary[];
  topVideos: Video[];
  featuredOn: Playlist[];
  similarArtists: SimilarArtist[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Artist {
  artistId: string | null;
  name: string;
}

interface Album {
  albumId: string;
  name: string;
}

export interface Song {
  type: 'SONG';
  videoId: string;
  name: string;
  artist: Artist;
  album: Album | null;
  duration: number | null;
  thumbnails: Thumbnail[];
}

export interface AlbumSummary {
  type: 'ALBUM';
  albumId: string;
  playlistId: string;
  name: string;
  artist: Artist;
  year: number | null;
  thumbnails: Thumbnail[];
}

interface Video {
  type: 'VIDEO';
  videoId: string;
  name: string;
  artist: Artist;
  duration: number | null;
  thumbnails: Thumbnail[];
}

interface Playlist {
  type: 'PLAYLIST';
  playlistId: string;
  name: string;
  artist: Artist;
  thumbnails: Thumbnail[];
}

export interface SimilarArtist {
  artistId: string;
  name: string;
  type: 'ARTIST';
  thumbnails: Thumbnail[];
}
