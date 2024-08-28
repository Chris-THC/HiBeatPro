import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {colorBase} from 'enums/AppColors';
import {AlbumSearch} from 'interfaces/AlbumSearch/AlbumSearch';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useAlbumStore} from 'store/albumStore/albumStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';

interface PropArtist {
  albumArray: AlbumSearch[];
}
interface PropCradArtist {
  album: AlbumSearch;
}

const CradAalbum: React.FC<PropCradArtist> = ({album}) => {
  const {setAlbumsInfoSelected} = useAlbumStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(
      album?.thumbnails?.[4]?.url || album?.thumbnails?.[3]?.url,
    );
    setColorTaget(colorImg);
  };

  const GoToArtistScreen = () => {
    setAlbumsInfoSelected(album);
    navigation.navigate('Album');
  };

  useEffect(() => {
    GetColorImage();
  }, [album.artist.artistId]);

  return (
    <RNBounceable
      onPress={() => GoToArtistScreen()}
      style={[
        styles.contentCards,
        {
          backgroundColor: `${!colorTaget ? '#22242a' : colorTaget?.dominant}`,
        },
      ]}>
      <View style={styles.imgContainer}>
        <FastImage
          style={styles.imgCrad}
          source={{
            uri: album?.thumbnails?.[4]?.url || album?.thumbnails?.[3]?.url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.contentText}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artistName}>
          {album.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.artistArtist}>
          {album.artist.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.yearText}>{`Year • ${album.year}`}</Text>
      </View>
    </RNBounceable>
  );
};

export const AlbumsListSearch: React.FC<PropArtist> = ({albumArray}) => {
  return (
    <View style={styles.listArtist}>
      <FlashList
        data={albumArray}
        numColumns={1}
        scrollEnabled={true}
        estimatedItemSize={20}
        renderItem={({item}) => <CradAalbum album={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listArtist: {
    flex: 1,
    backgroundColor: colorBase,
  },
  contentCards: {
    marginHorizontal: 10,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  imgContainer: {
    flex: 3,
  },
  imgCrad: {
    height: 105,
    width: 105,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentText: {
    flex: 6,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // alignContent: 'center',
    color: '#fff',
  },

  artistName: {
    fontSize: 19,
    fontFamily: 'Poppins-Normal',
    textAlign: 'center',
    fontWeight: '500',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 2,
  },
  artistArtist: {
    fontSize: 16,
    fontFamily: 'Poppins-Normal',
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
    fontSize: 14,
    fontFamily: 'Poppins',
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
