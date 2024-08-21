import { create } from 'zustand';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

interface BottomSheetState {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  presentModal: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetModalRef: { current: null },
  presentModal: () => {
    const { bottomSheetModalRef } = get();
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.expand()
  },
}));
