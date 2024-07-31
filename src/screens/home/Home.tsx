import {colorBase} from 'enums/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colorBase,
    color: '#fff',
  },
});
