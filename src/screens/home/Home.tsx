import React from 'react';
import {ScrollView, View} from 'react-native';
import {ActiveTrackCrad} from '../../components/ActiveTrackCrad/ActiveTrackCrad';
import {NavBar} from '../../components/NavBar/NavBar';
import {StatusUpBar} from '../../components/StatusBar/StatusUpBar';
import {TopArtist} from '../../components/TopArtist/views/TopArtist';
import {colorBase} from '../../enums/AppColors';
import styles from './styles/HomeSyles';
import {AlbumsResale} from '../../components/AlbumsResale/views/AlbumsResale';
import {RandomPlayList} from '../../components/RandomPlaylist/views/RandomPlayList';

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
