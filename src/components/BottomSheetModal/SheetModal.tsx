import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {secondColor} from 'enums/AppColors';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';
import {BottomSheetModalFC} from './BottomSheetModal';
import {MenuComponent} from './MenuItem';

export const SheetModal: React.FC = () => {
  const {bottomSheetModalRef} = useBottomSheetStore();
  //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  //   const handlePresentModalPress = useCallback(() => {
  //     bottomSheetModalRef.current?.present();
  //   }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundComponent={BottomSheetModalFC}>
          <BottomSheetView style={styles.contentContainer}>
            <MenuComponent />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 24,
    justifyContent: 'center',
    backgroundColor: secondColor,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  actionsContainer: {
    flex: 1, // 20%
    alignItems: 'center',
  },
});
