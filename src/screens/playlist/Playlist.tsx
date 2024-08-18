import {ActiveTrackCrad} from 'components/ActiveTrackCrad/ActiveTrackCrad';
import {SheetModal} from 'components/BottomSheetModal/SheetModal';
import {PlaylistHeader} from 'components/PlaylistComponents/components/PlaylistHeader';
import {TrackListByPlaylist} from 'components/PlaylistComponents/components/TracklistByPlaylist';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import {usePlaylistPublic} from 'hooks/UsePublicPlaylist/UsePublicPlaylist';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {usePlaylisStore} from 'store/playlistStore/playlistStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';

export const Playlist = () => {
  const {idPlaylist, playlistSelected} = usePlaylisStore();
  const {isError, isLoading, data: playlist} = usePlaylistPublic(idPlaylist);
  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    if (playlistSelected) {
      const colorImg = await ImageColorPalette(playlistSelected.artwork);
      setColorTaget(colorImg);
    }
  };

  useEffect(() => {
    GetColorImage();
  }, [playlistSelected?.browseId]);

  if (isLoading) {
    return (
      <View style={styles.PublicPlaylistContent}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.PublicPlaylistContent}>
      <StatusUpBar backgroundColor={colorTaget?.muted || colorBase} />
      <LinearGradient
        colors={[
          colorTaget?.muted || colorBase,
          colorTaget?.muted || colorBase,
          colorBase,
        ]}
        locations={[0.01, 0.3, 1]}
        style={{flex: 1}}>
        <PlaylistHeader />
      </LinearGradient>
      <View style={{height: 'auto', flex: 2.8}}>
        <TrackListByPlaylist topSongs={playlist!} />
      </View>
      <ActiveTrackCrad />
      <SheetModal />
    </View>
  );
};

const styles = StyleSheet.create({
  PublicPlaylistContent: {
    flex: 1,
    backgroundColor: colorBase,
    color: '#fff',
  },
});
