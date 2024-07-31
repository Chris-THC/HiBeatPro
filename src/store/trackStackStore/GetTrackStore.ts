import {Track} from 'react-native-track-player';
import {create} from 'zustand';

interface StackTracksStore {
  trackOnStack: Track[] | null;
  setTrackOnStack: (trackItem: Track[]) => void;
}

export const useTrackStackStore = create<StackTracksStore>(set => ({
  trackOnStack: null,
  setTrackOnStack: (trackItem: Track[]): void => {
    return set(() => ({
      trackOnStack: trackItem,
    }));
  },
}));
