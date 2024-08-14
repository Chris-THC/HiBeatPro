import {Song} from 'interfaces/ArtistInterface/YTMuiscArtistInterface';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import {create} from 'zustand';

interface ModalTrack {
  trackInfo: SongDetailed | Song | null;
  setTrackInfo: (trackInfo: SongDetailed | Song) => void;
}

export const useModalTrack = create<ModalTrack>(set => ({
  trackInfo: null,
  setTrackInfo: (track: SongDetailed | Song): void => {
    return set(() => ({
      trackInfo: track,
    }));
  },
}));
