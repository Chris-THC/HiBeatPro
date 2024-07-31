import { create } from 'zustand';
import { RandomPlaylistInterface } from '../../interfaces/randomPlayList/RandomPlaylist';

interface PlaylistStore {
  idPlaylist: string;
  setIdPlaylist: (idPlaylist: string) => void;

  playlistSelected: RandomPlaylistInterface | null;
  setPlaylistSelected: (album: RandomPlaylistInterface) => void;
}

export const usePlaylisStore = create<PlaylistStore>(set => ({
  idPlaylist: '',
  setIdPlaylist: (idPlaylist: string): void => {
    return set(() => ({
      idPlaylist: idPlaylist,
    }));
  },

  playlistSelected: null,
  setPlaylistSelected: (playlist: RandomPlaylistInterface): void => {
    return set(() => ({
      playlistSelected: playlist,
    }));
  },
}));
