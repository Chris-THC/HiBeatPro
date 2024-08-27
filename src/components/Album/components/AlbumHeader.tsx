import { AlbumSearch } from 'interfaces/AlbumSearch/AlbumSearch';
import { AlbumSummary } from 'interfaces/ArtistInterface/YTMuiscArtistInterface';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';
import { getThumbnailUrl } from 'utils/selectImage/SelectImage';

interface PropArtist {
  albumInfoSelected: AlbumSearch | AlbumSummary;
}

export const AlbumHeader: React.FC<PropArtist> = ({albumInfoSelected}) => {
  const thumbnailUrl = getThumbnailUrl(albumInfoSelected?.thumbnails);

  return (
    <View style={styles.contenAlbumHeader}>
      <View>
        <FastImage
          style={styles.imageStyles}
          source={{
            uri: thumbnailUrl,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.contentText}>
        <TextTicker
          style={styles.artistName}
          duration={30000}
          loop
          bounce={true}
          repeatSpacer={100}
          marqueeDelay={500}>
          {albumInfoSelected!.name}
        </TextTicker>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.artistArtist}>
          {albumInfoSelected!.artist.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.yearText}>{`${albumInfoSelected!.year}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    height: 160,
    width: 160,
    borderRadius: 8,
  },
  contenAlbumHeader: {
    height: 280,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 20,
    marginBottom: 10,
  },
  contentText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'center',
    color: '#fff',
    marginLeft: 10,
    height: '85%',
    width: '60%',
  },

  artistName: {
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginHorizontal: 2,
    width: 210,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 10,
  },
  artistArtist: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 22,
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
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 3,
  },
});
