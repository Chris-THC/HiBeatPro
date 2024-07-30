import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorBase} from '../../enums/AppColors';
import {PlayerScreen} from '../../components/PlayerComponents/view/PlayerScreen';

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
