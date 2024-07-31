import RNBounceable from '@freakycoder/react-native-bounceable';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AlbumRelaseInterface} from '../../../interfaces/AlbumsRelase/AlbumsRelase';
import {AndroidColors} from '../../../interfaces/colorsInterface/Colors';
import {ImageColorPalette} from '../../../utils/colors/ColorsFromImg';
import styles from '../styles/AlbReleasedCrad';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/screenStack';
import { useAlbumStore } from '../../../store/albumStore/albumStore';

interface ArtistCard {
  albumRealseInfo: AlbumRelaseInterface;
}

export const AlbumRelaseCrad: React.FC<ArtistCard> = ({albumRealseInfo}) => {
  const {setAlbumListStore} = useAlbumStore();
  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(albumRealseInfo.artwork);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, []);

  return (
    <RNBounceable
      onPress={() => {
        setAlbumListStore(albumRealseInfo);
        navigation.navigate('AlbumRealce');
      }}
      style={[
        styles.contentCard,
        {
          backgroundColor: `${!colorTaget ? '#22242a' : colorTaget?.darkMuted}`,
          borderRadius: 10,
        },
      ]}>
      <FastImage
        style={styles.imageAlbumCard}
        source={{
          uri: albumRealseInfo.artwork,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text
        style={[styles.textArtistName]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {albumRealseInfo.title}
      </Text>
    </RNBounceable>
  );
};
