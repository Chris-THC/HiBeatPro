import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopArtistInterface} from 'interfaces/TopArtistInterface/TopArtist';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useArtistStore} from 'store/artistStore/artistStore';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';
import styles from './../styles/ArtistCard';

interface PropsArtistCard {
  artistInfo: TopArtistInterface;
}

export const ArtistCard: React.FC<PropsArtistCard> = ({artistInfo}) => {
  const {setArtistId} = useArtistStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(artistInfo.imgCover[1].url);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, []);

  const GoToArtistScreen = () => {
    setArtistId(artistInfo.idArtist);
    navigation.navigate('ArtistScren');
  };

  return (
    <RNBounceable onPress={GoToArtistScreen} style={[styles.fullContainer]}>
      <View
        style={[
          styles.artistContentInfo,
          {
            backgroundColor: `${!colorTaget ? '#22242a' : colorTaget?.muted}`,
          },
        ]}>
        <View style={styles.artistContentInfoContText}>
          <Text style={styles.artistName}>{artistInfo.nameArtist}</Text>
        </View>

        <FastImage
          style={styles.imageArtistCard}
          source={{
            uri:
              artistInfo?.imgCover?.[1]?.url || artistInfo?.imgCover?.[0]?.url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </RNBounceable>
  );
};
