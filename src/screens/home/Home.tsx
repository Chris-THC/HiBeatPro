import React from 'react';
import {colorBase} from 'enums/AppColors';
import {ScrollView, StyleSheet, View} from 'react-native';
import { StatusUpBar } from 'components/statusBars/StatusUpBar';
import { NavBar } from 'components/NavBar/NavBar';

export const Home: React.FC = () => {
  return (
    <View style={styles.homeContainer}>
      <StatusUpBar backgroundColor={colorBase} />
      <NavBar />
      <ScrollView>
        {/* <TopArtist />
        <AlbumsResale />
        <RandomPlayList /> */}
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
