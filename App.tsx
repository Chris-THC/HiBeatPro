import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View style={styles.cotainer}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
});
