import {Feather} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { RootStackParamList } from 'scrrenTypes/screenStack';

export const NavBar: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const searchAction = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.navBarContainer}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconBtnStyles: {
    marginHorizontal: 8,
  },
});
