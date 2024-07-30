import {create} from 'zustand';

interface ArtistStore {
  artistId: string;
  setArtistId: (idSelected: string) => void;
}

export const useArtistStore = create<ArtistStore>(set => ({
  artistId: '',
  setArtistId: (idSelected: string): void => {
    return set(() => ({
      artistId: idSelected,
    }));
  },
}));
