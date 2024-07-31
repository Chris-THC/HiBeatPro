import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface PropsTrack {
  cover: string | null | undefined;
}

export const TrackCover: React.FC<PropsTrack> = ({cover}) => {
  return (
    <View>
      <FastImage
        style={styles.imgStyles}
        source={
          cover
            ? {uri: cover, priority: FastImage.priority.high}
            : require('../image/TrackCover.jpg')
        }
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyles: {
    height: 350,
    width: 350,
    borderRadius: 10,
  },
});
