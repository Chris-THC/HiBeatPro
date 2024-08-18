import {ActiveTrackCrad} from 'components/ActiveTrackCrad/ActiveTrackCrad';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import {useStreamingAlbum} from 'hooks/UseAlbum/UseAlbum';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useAlbumStore} from 'store/albumStore/albumStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';
import {getThumbnailUrl} from 'utils/selectImage/SelectImage';
import {AlbumHeaderRealce} from './components/AlbumHeaderRealce';
import {TrackListByAlbumRealce} from './components/TrackListRealce';
import { SheetModal } from 'components/BottomSheetModal/SheetModal';

export const AlbumRealce = () => {
  const {albumListStore} = useAlbumStore();
  const thumbnailUrl = getThumbnailUrl(albumListStore?.artwork);

  const {
    isLoading,
    data: albumData,
    isError,
  } = useStreamingAlbum(albumListStore!.playlistId, thumbnailUrl);

  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(thumbnailUrl);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, [albumListStore?.playlistId]);

  if (isLoading) {
    return (
      <View style={styles.somethinfWasWrong}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (isError) {
    return (
      <View style={styles.somethinfWasWrong}>
        <Text style={{color: '#fff', fontSize: 20}}>Ups hay un error..!</Text>
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
          <AlbumHeaderRealce albumInfoSelected={albumListStore!} />
        </LinearGradient>
      </>
      <View style={{height: 'auto', flex: 2.8}}>
        <TrackListByAlbumRealce topSongs={albumData!} />
      </View>
      <ActiveTrackCrad />
      <SheetModal />

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
  somethinfWasWrong: {
    flex: 1,
    backgroundColor: colorBase,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
