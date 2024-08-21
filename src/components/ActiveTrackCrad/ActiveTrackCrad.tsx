import {Marquee} from '@animatereactnative/marquee';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useActiveTrack} from 'react-native-track-player';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {togglePlayback} from 'services/TrackPlayerService/TrackPlayerEvents';
import {useIsTrackPlaying} from 'services/TrackPlayerService/TrackPlayerStates';
import TrackCover from 'images/TrackCover.jpg';

export const ActiveTrackCrad: React.FC = () => {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsTrackPlaying();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <RNBounceable
      onPress={() => navigation.navigate('Player')}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={
            activeTrack?.artwork
              ? {uri: activeTrack.artwork, priority: FastImage.priority.high}
              : TrackCover
          }
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.infoContainer}>
        <Marquee spacing={50} speed={0.5}>
          <Text style={styles.artistName}>{`${
            activeTrack?.title || 'Track name'
          }  •  ${activeTrack?.artist || 'Artist name'}`}</Text>
        </Marquee>
      </View>
      <RNBounceable onPress={togglePlayback} style={styles.actionsContainer}>
        {isPlaying ? (
          <AntDesign name="pause" size={28} color={'#fff'} />
        ) : (
          <FontAwesome name="play" size={22} color="#fff" />
        )}
      </RNBounceable>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  navPlayerContent: {
    height: 58,
    backgroundColor: '#202125',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // TrackSection
  container: {
    height: 60,
    backgroundColor: '#202125',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  imageContainer: {
    flex: 1, // 10%
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 4, // 40%
    justifyContent: 'center',
    marginLeft: 10,
    height: '100%',
  },
  artistName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  actionsContainer: {
    flex: 2 / 3,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 5,
  },
});
