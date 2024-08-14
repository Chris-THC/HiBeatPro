import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import {colorBase, secondColor} from 'enums/AppColors';
import React, {useMemo} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const BottomSheetModalFC: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colorBase, secondColor],
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  //#endregion

  // render
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
