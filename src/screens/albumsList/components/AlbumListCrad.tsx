import RNBounceable from '@freakycoder/react-native-bounceable';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import styles from './StylesAlbumCard';

import {AlbumRelaseInterface} from '../../../interfaces/AlbumsRelase/AlbumsRelase';
import {AndroidColors} from '../../../interfaces/colorsInterface/Colors';
import {useAlbumStore} from '../../../store/albumStore/albumStore';
import {RootStackParamList} from '../../../types/screenStack';
import {ImageColorPalette} from '../../../utils/colors/ColorsFromImg';
import {getThumbnailUrl} from '../../../utils/selectImage/SelectImage';

interface AlbumCradProp {
  album: AlbumRelaseInterface;
}

export const AlbumCardByRealce: React.FC<AlbumCradProp> = ({album}) => {
  const [colorTaget, setColorTaget] = useState<AndroidColors | null>(null);
  const {setAlbumListStore} = useAlbumStore();
  const thumbnailUrl = getThumbnailUrl(album.artwork);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const GetColorImage = async () => {
    const colorImg = await ImageColorPalette(album.artwork);
    setColorTaget(colorImg);
  };

  useEffect(() => {
    GetColorImage();
  }, [album.browseId]);

  const GoToArtistScreen = () => {
    setAlbumListStore(album);
    navigation.navigate('AlbumRealce');
  };

  return (
    <RNBounceable
      onPress={() => {
        GoToArtistScreen();
      }}
      style={[
        styles.playlistCard,
        {
          backgroundColor: `${!colorTaget ? '#22242a' : colorTaget?.dominant}`,
          borderColor: `${!colorTaget ? '#22242a' : colorTaget?.muted}`,
        },
      ]}>
      <FastImage
        style={styles.imageCrad}
        source={{
          uri: thumbnailUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text style={styles.titleCrad} numberOfLines={1} ellipsizeMode="tail">
        {album.title}
      </Text>

      <View style={styles.playIconOnImage}>
        <FontAwesome name="play" size={25} color="#fff" />
      </View>
    </RNBounceable>
  );
};

// export const AlbumListCrad: React.FC<AlbumListProps> = ({topAlbums}) => {
//   return (
//     <View style={{minHeight: 250, width: 'auto'}}>
//       <FlashList
//         data={topAlbums}
//         numColumns={1}
//         horizontal={true}
//         scrollEnabled={true}
//         estimatedItemSize={10}
//         showsVerticalScrollIndicator={false}
//         renderItem={({item}) => <AlbumCard album={item} />}
//       />
//     </View>
//   );
// };
