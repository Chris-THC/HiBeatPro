import {Feather} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import logHome from 'images/nameApp.png';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from 'scrrenTypes/screenStack';

export const NavBar: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const searchAction = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.navBarContainer}>
      <View style={styles.imgContainer}>
        <FastImage style={styles.image} source={logHome} />
      </View>

      <RNBounceable onPress={searchAction}>
        <Feather
          style={styles.iconBtnStyles}
          name="search"
          size={33}
          color="#fff"
        />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
  },
  iconBtnStyles: {
    marginHorizontal: 8,
  },
  imgContainer: {
    marginTop: 8,
    height: 60,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  image: {
    height: 88,
    width: 200,
  },
});
