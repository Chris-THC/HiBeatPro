import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {MenuView} from '@react-native-menu/menu';

export const PopUpMenu = () => {
  return (
    <View style={styles.container}>
      <MenuView
        title="Menu Title"
        onPressAction={({nativeEvent}) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'add',
            title: 'Add',
            titleColor: '#2367A2',
            image: Platform.select({
              ios: 'plus',
              android: 'ic_menu_add',
            }),
            imageColor: '#2367A2',
          },
          {
            id: 'save',
            title: 'Download track',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_save',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
        ]}
        shouldOpenOnLongPress={false}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Test</Text>
        </View>
      </MenuView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {},
  buttonText: {
    color: '#fff',
  },
});
