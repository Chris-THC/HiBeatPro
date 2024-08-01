import {ActiveTrackCrad} from 'components/ActiveTrackCrad/ActiveTrackCrad';
import {AlbumsResale} from 'components/AlbumsResale/views/AlbumsResale';
import {NavBar} from 'components/NavBar/NavBar';
import {RandomPlayList} from 'components/RandomPlaylist/views/RandomPlayList';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {TopArtist} from 'components/TopArtist/views/TopArtist';
import {colorBase} from 'enums/AppColors';
import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles/HomeSyles';

export const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <StatusUpBar backgroundColor={colorBase} />
      <NavBar />
      <ScrollView>
        <TopArtist />
        <AlbumsResale />
        <RandomPlayList />
      </ScrollView>
      <ActiveTrackCrad />
    </View>
  );
};
