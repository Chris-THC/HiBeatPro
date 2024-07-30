import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActiveTrackCrad} from '../../components/ActiveTrackCrad/ActiveTrackCrad';
import {AlbumHeader} from '../../components/Album/components/AlbumHeader';
import {TrackListByAlbum} from '../../components/Album/components/TrackListByAlbum';
import {StatusUpBar} from '../../components/StatusBar/StatusUpBar';
import {colorBase} from '../../enums/AppColors';
import {useStreamingAlbum} from '../../hooks/UseAlbum/UseAlbum';
import {AndroidColors} from '../../interfaces/colorsInterface/Colors';
import {useAlbumStore} from '../../store/albumStore/albumStore';
import {ImageColorPalette} from '../../utils/colors/ColorsFromImg';
import {getThumbnailUrl} from '../../utils/selectImage/SelectImage';
import { Text } from 'react-native-svg';

export const Album = () => {
  const {albumInfoSelected} = useAlbumStore();
  const thumbnailUrl = getThumbnailUrl(albumInfoSelected?.thumbnails);

  const {isLoading, data: albumData, isError} = useStreamingAlbum(albumInfoSelected!.playlistId, thumbnailUrl);

  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(thumbnailUrl);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, [albumInfoSelected?.playlistId]);

  if (isLoading) {
    return (
      <View style={styles.someWasWorng}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.someWasWorng}>
        <Text>Ups hay un error!</Text>
      </View>
    );
  }

  return (
    <View style={styles.albumContainer}>
      <>
        <StatusUpBar backgroundColor={colorTaget?.dominant || colorBase} />
        <LinearGradient
          colors={[
            colorTaget?.dominant || colorBase,
            colorTaget?.dominant || colorBase,
            colorBase,
          ]}
          locations={[0.01, 0.3, 1]}
          style={{flex: 1}}>
          <AlbumHeader albumInfoSelected={albumInfoSelected!} />
        </LinearGradient>
      </>
      <View style={{height: 'auto', flex: 2.8}}>
        <TrackListByAlbum topSongs={albumData!} />
      </View>
      <ActiveTrackCrad />
    </View>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    backgroundColor: colorBase,
  },
  artistName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 10,
  },
  artistArtist: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 3,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 3,
  },
  someWasWorng: {
    flex: 1,
    backgroundColor: colorBase,
    justifyContent: 'center',
    alignItems: 'center',
    color:"#fff",
    fontSize:20
  },
});
