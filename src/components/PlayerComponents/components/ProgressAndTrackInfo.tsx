import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {useActiveTrack, useProgress} from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import {formatToSeconds} from 'utils/time/SecondsToMinutes';

interface PropsColors {
  lightMuted: string;
  mutued: string;
}

export const ProgressAndTrackInfo: React.FC<PropsColors> = ({
  lightMuted,
  mutued,
}) => {
  const activeTrack = useActiveTrack();
  const progress = useProgress();

  return (
    <View>
      <Slider
        style={styles.progressBar}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={mutued}
        maximumTrackTintColor={lightMuted}
        minimumTrackTintColor={mutued}
        onSlidingComplete={async (time: number) => {
          await TrackPlayer.seekTo(Math.round(time));
        }}
      />

      <View style={styles.contentTextSeconds}>
        <Text style={styles.textSeconds}>
          {formatToSeconds(progress.position)}
        </Text>
        <Text style={styles.textSeconds}>
          {formatToSeconds(progress.duration)}
        </Text>
      </View>

      <View style={styles.containerText}>
        <TextTicker
          style={styles.artistName}
          duration={10000}
          loop
          bounce={true}
          repeatSpacer={80}
          marqueeDelay={30}>
          {activeTrack?.title || 'Waiting a new track'}
        </TextTicker>

        <TextTicker
          style={styles.titleTrack}
          duration={10000}
          loop
          bounce={true}
          repeatSpacer={80}
          marqueeDelay={30}>
          {activeTrack?.artist || 'Waiting a new track'}
        </TextTicker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  textSeconds: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  contentTextSeconds: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  // text trackInfo

  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  titleTrack: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
    marginVertical: 8,
    textAlign: 'center',
  },
});
