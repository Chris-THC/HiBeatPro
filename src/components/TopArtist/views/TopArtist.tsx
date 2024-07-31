import React from 'react';
import {Text, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ArtistCard} from '../components/ArtistCard';
import styles from '../styles/TopArtistSryles';
import { useTopArtistGlobal } from 'hooks/UseTopArtist/UseTopArtist';
import { TopArtistLoader } from 'utils/skeleton/loaders/TopArtist/TopArtisLoader';

export const TopArtist = () => {
  const {data: Top10, isLoading: isLoadingTop10, isError} = useTopArtistGlobal();

  if (isLoadingTop10) {
    return (
      <View>
        <TopArtistLoader />
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.topArtistContent}>
        <Text style={{fontSize: 20, color: '#fff'}}>Something was wrong..!</Text>
      </View>
    );
  }

  return (
    <View style={styles.topArtistContent}>
      <View>
        <Text style={styles.artistMainTitle}>Top Artist</Text>
      </View>
      <FlashList
        data={Top10}
        renderItem={({item}) => <ArtistCard artistInfo={item} />}
        estimatedItemSize={20}
        scrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
