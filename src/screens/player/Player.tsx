import {PlayerScreen} from 'components/PlayerComponents/view/PlayerScreen';
import {colorBase} from 'enums/AppColors';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Player = () => {
  return (
    <View style={styles.contenPlayer}>
      <PlayerScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  contenPlayer: {
    flex: 1,
    backgroundColor: colorBase,
  },
});
