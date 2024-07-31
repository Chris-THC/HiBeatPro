import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useSearchStore } from 'store/searchStore/SearchStore';
import { TrackListSerach } from '../components/TrackListSearch';
import { colorBase } from 'enums/AppColors';

export const TrackSearch = () => {
  const {trackList} = useSearchStore();

  return (
    <View style={styles.trackContent}>
      {!trackList ? (
        <View style={styles.contentNull}>
          <Text style={styles.textStyleError}></Text>
        </View>
      ) : (
        <View style={styles.trackContent}>
          <TrackListSerach topSongs={trackList!} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trackContent: {
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
