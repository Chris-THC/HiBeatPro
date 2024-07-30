import React from 'react';
import {View} from 'react-native';
import {PlaylistAllItemsList} from '../../components/RandomPlaylist/views/PlaylistAllItemsList';
import {useRandomPlaylistStore} from '../../store/randomPlatlistStore/randomPlaylistStore';
import Styles from './styles/RandPlaylistStyles';
import {ActiveTrackCrad} from '../../components/ActiveTrackCrad/ActiveTrackCrad';

export const RandomPlayListStack = () => {
  const {randomPlaylistStore} = useRandomPlaylistStore();
  return (
    <View style={Styles.ramdomPlaylistContainer}>
      <PlaylistAllItemsList playlist={randomPlaylistStore} />
      <ActiveTrackCrad />
    </View>
  );
};
