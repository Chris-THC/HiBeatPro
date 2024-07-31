import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {ActiveTrackCrad} from '../../components/ActiveTrackCrad/ActiveTrackCrad';
import {AlbumList} from '../../components/ArtistComponents/components/AlbumList/AlbumList';
import {ArtistList} from '../../components/ArtistComponents/components/ArtistList/ArtistList';
import {TrackList} from '../../components/ArtistComponents/components/TrackList/TrackList';
import {StatusUpBarTransparent} from '../../components/StatusBar/StatusUpBarTransparent';
import {colorBase} from '../../enums/AppColors';
import {useArtistInfoById} from '../../hooks/UseYtMusic/UserYtMusic';
import {useArtistStore} from '../../store/artistStore/artistStore';
import styles from './styles/Artiststyles';

export const Artist = () => {
  const {artistId} = useArtistStore();
  const {isLoading, data: artistData} = useArtistInfoById(artistId);

  if (isLoading) {
    return (
      <View style={styles.artistMainContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colorBase}}>
      <StatusUpBarTransparent />
      <ScrollView>
        <View style={{position: 'relative'}}>
          <FastImage
            style={{height: 250, width: '100%'}}
            source={{
              uri:
                artistData?.thumbnails?.[1]?.url ||
                artistData?.thumbnails?.[0]?.url,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <LinearGradient
            colors={['transparent', colorBase]}
            style={styles.linearGradient}
          />
        </View>

        <View style={styles.artistNameContainer}>
          <Text style={styles.artistNameText}>{artistData!.name}</Text>
        </View>

        <View style={{flex: 1}}>
          <TrackList topSongs={artistData!.topSongs} />
        </View>

        <View>
          <Text style={styles.subTitleText}>Popular Albums</Text>
          <AlbumList topAlbums={artistData!.topAlbums} />
        </View>

        <View>
          <Text style={styles.subTitleText}>Similar Artist</Text>
          <ArtistList similarArtists={artistData!.similarArtists} />
        </View>
      </ScrollView>
      <ActiveTrackCrad />
    </View>
  );
};
