export interface AlbumFull {
  type: string;
  albumId: string;
  name: string;
  playlistId: string;
  artist: Artist;
  year: any;
  thumbnails: any[];
  songs: Song[];
}

interface Artist {
  artistId: any;
  name: string;
}

interface Song {
  type: string;
  videoId: string;
  name: string;
  artist: Artist2;
  album: Album;
  duration: any;
  thumbnails: any[];
}

interface Artist2 {
  artistId: any;
  name: string;
}

interface Album {
  albumId: string;
  name: string;
}
