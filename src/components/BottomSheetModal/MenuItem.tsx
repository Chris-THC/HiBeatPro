import {
  FontAwesome5,
  FontAwesome6,
  MaterialIcons
} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colorBase, secondColor } from 'enums/AppColors';
import { UseIdPlayList } from 'hooks/UseAlbum/UseIdAlbum';
import { SuggestionsTrackListFuntion } from 'hooks/UseSimilarTracks/UseSimilarTracks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';
import { RootStackParamList } from 'scrrenTypes/screenStack';
import { handlerPlay } from 'services/TrackPlayerService/TrackPlayerEvents';
import { TrackDownloader } from 'services/downloader/Downloader';
import { getStreamingData } from 'services/streaming/StreamingTrack';
import { useAlbumStore } from 'store/albumStore/albumStore';
import { useArtistStore } from 'store/artistStore/artistStore';
import { useBottomSheetStore } from 'store/modalStore/useBottomSheetStore';
import { useModalTrack } from 'store/sheetModalTrack/ModalTrack';
import { getThumbnailUrl } from 'utils/selectImage/SelectImage';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  style?: object;
  onPress?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({icon, label, style, onPress}) => (
  <RNBounceable style={[styles.menuItem, style]} onPress={onPress}>
    {icon}
    <Text style={styles.menuItemText}>{label}</Text>
  </RNBounceable>
);

export const MenuComponent: React.FC = () => {
  const {trackInfo} = useModalTrack();
  const imageUrl = getThumbnailUrl(trackInfo?.thumbnails);
  // Movin betwen screens:
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setArtistId} = useArtistStore();
  const {setAlbumsInfoSelected} = useAlbumStore();
  const {bottomSheetModalRef} = useBottomSheetStore();

  //? Toast:
  const startedToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Download started',
      text2: 'Your track is now downloading ⬇️',
    });
  };

  const handlePlayTrack = async () => {
    const promise = getStreamingData(trackInfo!.videoId);
    const trackSelected = await promise;
    await TrackPlayer.setQueue([trackSelected]);
    let similarTracks = await SuggestionsTrackListFuntion(trackInfo!.videoId);
    handlerPlay();
    await TrackPlayer.add(similarTracks!);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View>
          <FastImage
            style={styles.imageStyle}
            source={{
              uri: imageUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{marginLeft: 15, width: '76%'}}>
          <TextTicker
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
            duration={15000}
            loop
            bounce={true}
            repeatSpacer={20}
            marqueeDelay={50}>
            {trackInfo?.name}
          </TextTicker>
          <TextTicker
            style={{color: '#ccc', fontSize: 15}}
            duration={15000}
            loop
            bounce={true}
            repeatSpacer={20}
            marqueeDelay={50}>
            {trackInfo?.artist.name}
          </TextTicker>
        </View>
      </View>
      <MenuItem
        icon={<FontAwesome6 name="itunes-note" size={26} color="#fff" />}
        label="Similar Track"
        style={styles.reportItem}
        onPress={() => handlePlayTrack()}
      />
      <MenuItem
        icon={<MaterialIcons name="download" size={26} color="#fff" />}
        label="Download Track"
        onPress={async () => {
          const track = await getStreamingData(trackInfo?.videoId!);
          bottomSheetModalRef.current?.close();
          startedToast();
          TrackDownloader(track.url, trackInfo!, track?.artwork!);
        }}
      />

      <MenuItem
        icon={<FontAwesome5 name="user-tag" size={24} color="#fff" />}
        label="Go to Artist"
        onPress={() => {
          setArtistId(trackInfo!.artist.artistId!);
          navigation.navigate('ArtistScren');
          bottomSheetModalRef.current?.close();
        }}
      />
      <MenuItem
        icon={<MaterialIcons name="album" size={26} color="#fff" />}
        label="Go to Album"
        onPress={async () => {
          const albumInfo = await UseIdPlayList(trackInfo!.album!.albumId!);
          if (albumInfo != null) {
            setAlbumsInfoSelected(albumInfo!);
            navigation.navigate('Album');
            bottomSheetModalRef.current?.close();
          } else {
            console.log('Album not found');
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: secondColor,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: colorBase,
    padding: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderBottomWidth: 0.53,
    borderBottomColor: '#333c',
    marginVertical: 1,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 17,
    color: '#fff',
  },
  reportItem: {
    paddingVertical: 15,
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
});
