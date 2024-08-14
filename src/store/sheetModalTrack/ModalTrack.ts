import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import {create} from 'zustand';

interface ModalTrack {
  trackInfo: SongDetailed | null;
  setTrackInfo: (trackInfo: SongDetailed) => void;
}

export const useModalTrack = create<ModalTrack>(set => ({
  trackInfo: null,
  setTrackInfo: (track: SongDetailed): void => {
    return set(() => ({
      trackInfo: track,
    }));
  },
}));
