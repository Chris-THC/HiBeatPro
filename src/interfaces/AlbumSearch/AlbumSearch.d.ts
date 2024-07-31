export interface AlbumSearch {
  playlistId: string;
  name: string;
  artist: Artist;
  year: string;
  type: string;
  thumbnails: Thumbnail[];
}

interface Artist {
  artistId: ArtistId;
  name: string;
}

interface ArtistId {
  browseId: string;
  browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs;
}

interface BrowseEndpointContextSupportedConfigs {
  browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig;
}

interface BrowseEndpointContextMusicConfig {
  pageType: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
