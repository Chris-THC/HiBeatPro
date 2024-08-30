import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackImage from 'images/TrackCover.jpg';

interface PropsTrack {
  cover: string | null | undefined;
}

export const TrackCover: React.FC<PropsTrack> = ({cover}) => {
  return (
    <View>
      <FastImage
        style={styles.imgStyles}
        source={
          cover ? {uri: cover, priority: FastImage.priority.high} : TrackImage
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyles: {
    width: 365,
    height: 365,
    borderRadius: 10,
  },
});
