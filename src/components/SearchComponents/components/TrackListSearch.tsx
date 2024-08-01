import {Entypo} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {FlashList} from '@shopify/flash-list';
import {SheetModal} from 'components/BottomSheetModal/SheetModal';
import {SuggestionsTrackListFuntion} from 'hooks/UseSimilarTracks/UseSimilarTracks';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer from 'react-native-track-player';
import {handlerPlay} from 'services/TrackPlayerService/TrackPlayerEvents';
import {getStreamingData} from 'services/streaming/StreamingTrack';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';
import {formatToSeconds} from 'utils/time/SecondsToMinutes';

interface PropsTrackList {
  topSongs: SongDetailed[];
}

interface PropTrackCard {
  track: SongDetailed;
  position: number;
  onTrackSelect: (position: number) => void;
}

const TrackCard: React.FC<PropTrackCard> = ({
  track,
  position,
  onTrackSelect,
}) => {
  const {bottomSheetModalRef, presentModal} = useBottomSheetStore();
  return (
    <RNBounceable
      onPress={() => onTrackSelect(position)}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: track?.thumbnails?.[1]?.url || track?.thumbnails?.[0]?.url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.trackName}>
          {track.name}
        </Text>
        <Text style={styles.artistName}>
          {`${track.artist.name}  •  ${formatToSeconds(track.duration)}`}
        </Text>
      </View>
      {/* <RNBounceable
        onPress={() => console.log('Opciones')}
        style={styles.actionsContainer}>
        <Entypo name="dots-three-horizontal" size={25} color="#fff" />
      </RNBounceable> */}
      <RNBounceable onPress={presentModal} style={styles.actionsContainer}>
        <Entypo name="dots-three-horizontal" size={25} color="#fff" />
      </RNBounceable>
    </RNBounceable>
  );
};

export const TrackListSerach: React.FC<PropsTrackList> = ({topSongs}) => {
  const playeAllTracks = async () => {
    const promises = topSongs.map(track => {
      return getStreamingData(track.videoId);
    });
    const streamingDataArray = await Promise.all(promises);
    await TrackPlayer.setQueue(streamingDataArray);
    handlerPlay();
  };

  const handleSelectTrack = async (position: number) => {
    const promise = getStreamingData(topSongs[position].videoId);
    const trackSelected = await promise;
    await TrackPlayer.setQueue([trackSelected]);
    await TrackPlayer.skip(position);
    handlerPlay();

    let similarTracks = await SuggestionsTrackListFuntion(
      topSongs[position].videoId,
    );

    await TrackPlayer.add(similarTracks!);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.contentSubTitles}>
        <Text style={styles.subTitleText}>Popular Songs</Text>
        <RNBounceable
          onPress={() => playeAllTracks()}
          style={styles.btnPlayAll}>
          <Text style={styles.btnPlayAllText}>Play All</Text>
        </RNBounceable>
      </View>
      <FlashList
        data={topSongs}
        numColumns={1}
        scrollEnabled={true}
        estimatedItemSize={50}
        renderItem={({item, index}) => (
          <TrackCard
            track={item}
            position={index}
            onTrackSelect={handleSelectTrack}
          />
        )}
      />
    </View>
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
    fontWeight: 'bold',
  },
  artistName: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    flex: 1, // 20%
    alignItems: 'center',
  },

  contentSubTitles: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subTitleText: {
    fontSize: 22,
    color: '#E9EFFF',
    fontWeight: '600',
    marginLeft: 5,
    marginVertical: 10,
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
    color: '#7791e4',
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 1,
  },
});
