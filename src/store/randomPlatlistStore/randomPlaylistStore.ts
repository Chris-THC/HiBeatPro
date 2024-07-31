import { create } from 'zustand';
import { RandomPlaylistInterface } from '../../interfaces/randomPlayList/RandomPlaylist';

interface PlaylistStore {
  randomPlaylistStore: RandomPlaylistInterface[] | null | undefined;
  setRandomPlaylistStore: (playlist: RandomPlaylistInterface[] | null | undefined) => void;
}

export const useRandomPlaylistStore = create<PlaylistStore>(set => ({
  randomPlaylistStore: null,
  setRandomPlaylistStore: (playlistItem: RandomPlaylistInterface[] | null | undefined): void => {
    return set(() => ({
      randomPlaylistStore: playlistItem,
    }));
  },
}));
