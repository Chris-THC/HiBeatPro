import NavigationStack from 'navigation/StackNavigation';
import React from 'react';
import {StyleSheet} from 'react-native';

const App = () => {
  return <NavigationStack />;
};

export default App;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
});
