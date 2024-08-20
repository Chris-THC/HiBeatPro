import {Feather} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
      <View
        style={{
          marginTop: 3,
          flexDirection: 'row',
          width: '80%',
          alignItems: 'center',
        }}>
        <View>
          <FastImage
            style={styles.image}
            source={require('./img/logoImg.png')}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 30, color: '#fff', fontWeight: 'bold'}}>
            HiBeat!
          </Text>
        </View>
      </View>
      <RNBounceable onPress={searchAction}>
        <Feather
          style={styles.iconBtnStyles}
          name="search"
          size={30}
          color="#fff"
        />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconBtnStyles: {
    marginHorizontal: 8,
  },
  image: {
    width: 45,
    height: 45,
    // borderRadius: 20,
  },
});
