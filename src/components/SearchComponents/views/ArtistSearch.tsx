import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colorBase} from '../../../enums/AppColors';
import {useSearchStore} from '../../../store/searchStore/SearchStore';
import {ArtistListSearch} from '../components/ArtistListSearch';

export const ArtistSearch = () => {
  const {artistList} = useSearchStore();

  if (artistList === null || artistList == undefined) {
    return (
      <View style={styles.contentNull}>
        <Text style={styles.textStyleError}></Text>
      </View>
    );
  }

  return (
    <View style={styles.artistContent}>
      <ArtistListSearch artistArray={artistList!} />
    </View>
  );
};

const styles = StyleSheet.create({
  artistContent: {
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
