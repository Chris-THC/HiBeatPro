export interface TopArtistInterface {
  idArtist: string;
  nameArtist: string;
  imgCover: ImgCover[];
}

interface ImgCover {
  url: string;
  width: number;
  height: number;
}
