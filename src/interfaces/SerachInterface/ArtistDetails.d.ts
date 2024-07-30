export interface ArtistDetailed {
  artistId: string;
  name: string;
  type: 'ARTIST';
  thumbnails: Thumbnail[];
}
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
