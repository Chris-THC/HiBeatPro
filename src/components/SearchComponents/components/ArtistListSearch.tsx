import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {colorBase} from 'enums/AppColors';
import {ArtistDetailed} from 'interfaces/SerachInterface/ArtistDetails';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useArtistStore} from 'store/artistStore/artistStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';

interface PropArtist {
  artistArray: ArtistDetailed[];
}
interface PropCradArtist {
  artist: ArtistDetailed;
}

const CradArtist: React.FC<PropCradArtist> = ({artist}) => {
  const {setArtistId} = useArtistStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(
      artist?.thumbnails?.[1]?.url || artist?.thumbnails?.[0]?.url,
    );
    setColorTaget(colorImg);
  };

  const GoToArtistScreen = () => {
    setArtistId(artist.artistId);
    navigation.navigate('ArtistScren');
  };

  useEffect(() => {
    GetColorImage();
  }, [artist.artistId]);

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
            uri: artist?.thumbnails?.[1]?.url || artist?.thumbnails?.[0]?.url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.contentText}>
        <Text style={styles.artistName}>{artist.name}</Text>
      </View>
    </RNBounceable>
  );
};

export const ArtistListSearch: React.FC<PropArtist> = ({artistArray}) => {
  return (
    <View style={styles.listArtist}>
      <FlashList
        data={artistArray}
        numColumns={1}
        scrollEnabled={true}
        estimatedItemSize={20}
        renderItem={({item}) => <CradArtist artist={item} />}
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: '#fff',
  },

  artistName: {
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 2,
  },
});
