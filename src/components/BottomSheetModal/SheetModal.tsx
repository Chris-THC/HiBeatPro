import {Entypo} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {secomTextColor, secondColor} from 'enums/AppColors';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheetModalFC} from './BottomSheetModal';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';

export const SheetModal: React.FC = () => {
  const {bottomSheetModalRef, presentModal} = useBottomSheetStore();
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
        {/* <RNBounceable onPress={presentModal} style={styles.actionsContainer}>
          <Entypo name="dots-three-horizontal" size={25} color="#fff" />
        </RNBounceable> */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundComponent={BottomSheetModalFC}>
          <BottomSheetView style={styles.contentContainer}>
            <Text style={{color: secomTextColor}}>Awesome 🎉</Text>
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
    position:"relative"
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
