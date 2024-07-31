import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {SimilarArtist} from 'interfaces/ArtistInterface/YTMuiscArtistInterface';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useArtistStore} from 'store/artistStore/artistStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';

interface ArtistListProps {
  similarArtists: SimilarArtist[];
}

interface ArtistListPropsCard {
  artistInfo: SimilarArtist;
}

const SimilarArtistCard: React.FC<ArtistListPropsCard> = ({artistInfo}) => {
  const {setArtistId} = useArtistStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(artistInfo.thumbnails[1].url);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, []);

  const GoToArtistScreen = () => {
    setArtistId(artistInfo.artistId);
    navigation.navigate('ArtistScren');
  };

  return (
    <RNBounceable onPress={GoToArtistScreen} style={[styles.fullContainer]}>
      <View
        style={[
          styles.artistContentInfo,
          {
            backgroundColor: `${
              !colorTaget ? '#22242a' : colorTaget?.dominant
            }`,
          },
        ]}>
        <View style={styles.artistContentInfoContText}>
          <Text style={styles.artistName}>{artistInfo.name}</Text>
        </View>

        <FastImage
          style={styles.imageArtistCard}
          source={{
            uri:
              artistInfo?.thumbnails?.[1]?.url ||
              artistInfo?.thumbnails?.[0]?.url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </RNBounceable>
  );
};

export const ArtistList: React.FC<ArtistListProps> = ({similarArtists}) => {
  return (
    <FlashList
      data={similarArtists}
      numColumns={1}
      horizontal={true}
      scrollEnabled={true}
      estimatedItemSize={10}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <SimilarArtistCard artistInfo={item} />}
    />
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    marginRight: 120,
    marginLeft: 6,
    height: 150,
  },
  topArtistContent: {
    flexDirection: 'column',
  },
  imageArtistCard: {
    height: 115,
    width: 115,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  artistName: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 2,
  },
  artistContentInfo: {
    flexDirection: 'row',
    width: 130,
    height: 115,
    justifyContent: 'space-between',
    margin: 3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  artistContentInfoContText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
