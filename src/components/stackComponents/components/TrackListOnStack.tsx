import {Entypo} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {UseSongDetaile} from 'hooks/UseSong/UseSong';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Track} from 'react-native-track-player';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';
import {useModalTrack} from 'store/sheetModalTrack/ModalTrack';

interface PropTrackCard {
  track: Track;
  position: number;
  onTrackSelect: (position: number) => void;
}

export const TrackCard: React.FC<PropTrackCard> = ({
  track,
  position,
  onTrackSelect,
}) => {
  const {presentModal} = useBottomSheetStore();
  const {setTrackInfo} = useModalTrack();

  return (
    <RNBounceable
      onPress={() => onTrackSelect(position)}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: track.artwork,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.trackName}>
          {track.title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artistName}>
          {track.artist}
        </Text>
      </View>
      <RNBounceable
        onPress={async () => {
          const songInfo = await UseSongDetaile(track.id);
          setTrackInfo(songInfo!);
          presentModal();
        }}
        style={styles.actionsContainer}>
        <Entypo name="dots-three-horizontal" size={25} color="#fff" />
      </RNBounceable>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  imageContainer: {
    flex: 1, // 10%
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 4, //40%
    justifyContent: 'center',
    marginLeft: 10,
    height: '100%',
  },
  trackName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  artistName: {
    color: '#ccc',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  actionsContainer: {
    flex: 1, // 20%
    alignItems: 'center',
  },

  btnPlayAll: {
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPlayAllText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ccc',
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 1,
  },
});
