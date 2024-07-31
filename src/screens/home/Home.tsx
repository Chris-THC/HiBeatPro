import {NavBar} from 'components/NavBar/NavBar';
import {TopArtist} from 'components/TopArtist/views/TopArtist';
import {StatusUpBar} from 'components/statusBars/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

export const Home: React.FC = () => {
  return (
    <View style={styles.homeContainer}>
      <StatusUpBar backgroundColor={colorBase} />
      <NavBar />
      <ScrollView>
        <TopArtist />
        {/* <AlbumsResale /> */}
        {/* <RandomPlayList /> */}
      </ScrollView>
      {/* <ActiveTrackCrad /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colorBase,
    color: '#fff',
  },
});
