import {create} from 'zustand';
import { AlbumSearch } from 'interfaces/AlbumSearch/AlbumSearch';
import { ArtistDetailed } from 'interfaces/SerachInterface/ArtistDetails';
import { SongDetailed } from 'interfaces/SerachInterface/SearchTracks';

interface SearchStore {
  searchSomething: string;
  setSearchSomething: (search: string) => void;

  trackList: SongDetailed[] | null;
  setTrackList: (trackList: SongDetailed[]) => void;

  artistList: ArtistDetailed[] | null;
  setArtistList: (artistList: ArtistDetailed[]) => void;

  albumsList: AlbumSearch[] | null;
  setAlbumsList: (album: AlbumSearch[] | null) => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  searchSomething: '',
  setSearchSomething: (search: string): void => {
    return set(() => ({
      searchSomething: search,
    }));
  },

  trackList: null,
  setTrackList: (trackList: SongDetailed[]): void => {
    return set(() => ({
      trackList: trackList,
    }));
  },

  artistList: null,
  setArtistList: (artist: ArtistDetailed[]): void => {
    return set(() => ({
      artistList: artist,
    }));
  },

  albumsList: null,
  setAlbumsList: (album: AlbumSearch[] | null): void => {
    return set(() => ({
      albumsList: album,
    }));
  },
}));
