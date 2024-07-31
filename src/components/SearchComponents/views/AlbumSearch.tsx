import React from 'react';
import {colorBase} from 'enums/AppColors';
import {StyleSheet, Text, View} from 'react-native';
import {useSearchStore} from 'store/searchStore/SearchStore';
import {AlbumsListSearch} from '../components/AlbumsListSearch';

export const AlbumSearch = () => {
  const {albumsList} = useSearchStore();

  if (albumsList === null) {
    return (
      <View style={styles.contentNull}>
        <Text style={styles.textStyleError}></Text>
      </View>
    );
  }

  return (
    <View style={styles.albumContent}>
      <AlbumsListSearch albumArray={albumsList!} />
    </View>
  );
};

const styles = StyleSheet.create({
  albumContent: {
    flex: 1,
    backgroundColor: colorBase,
  },
  contentNull: {
    flex: 1,
    backgroundColor: colorBase,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  textStyleError: {
    fontSize: 18,
    color: '#fff',
  },
});
