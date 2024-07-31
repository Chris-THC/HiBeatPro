export interface PublicPlaylist {
  videoId: string;
  name: string;
  artist: string;
  duration: string;
  thumbnails: Thumbnail[];
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
