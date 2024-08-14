import { create } from 'zustand'
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface BottomSheetState {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  presentModal: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetModalRef: {current: null},
  presentModal: () => {
    const {bottomSheetModalRef} = get();
    bottomSheetModalRef.current?.present();
  },
}));
