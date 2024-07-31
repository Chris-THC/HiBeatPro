import {create} from 'zustand';
import {AlbumRelaseInterface} from '../../interfaces/AlbumsRelase/AlbumsRelase';

interface AlbumListStore {
  albumsLitStore: AlbumRelaseInterface[] | null;
  setAlbumListStore: (album: AlbumRelaseInterface[]) => void;
}

export const useAlbumListStore = create<AlbumListStore>(set => ({
  albumsLitStore: null,
  setAlbumListStore: (album: AlbumRelaseInterface[]): void => {
    return set(() => ({
      albumsLitStore: album,
    }));
  },
}));
