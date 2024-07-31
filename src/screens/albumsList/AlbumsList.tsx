import {FontAwesome6} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useAlbumListStore} from 'store/albumResaleStore/AlbumsResaleStore';
import {AlbumCardByRealce} from './components/AlbumListCrad';

export const AlbumsList = () => {
  const {albumsLitStore} = useAlbumListStore();
  const navigateTo =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (albumsLitStore === null || albumsLitStore === undefined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusUpBar backgroundColor={colorBase} />
      <View style={styles.contentSubTitles}>
        <RNBounceable
          style={styles.btnGoBack}
          onPress={() => navigateTo.goBack()}>
          <FontAwesome6 name="arrow-left-long" size={30} color="#fff" />
        </RNBounceable>
        <View>
          <Text style={styles.subTitleText}>Recently released albums </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlashList
          data={albumsLitStore}
          numColumns={2}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={50}
          renderItem={({item}) => <AlbumCardByRealce album={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBase,
    color: '#fff',
  },
  contentSubTitles: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subTitleText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    marginVertical: 5,
  },
  btnGoBack: {
    height: 45,
    width: 45,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 30,
  },
});
