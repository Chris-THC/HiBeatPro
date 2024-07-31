import {FontAwesome6} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {useAlbumRelase} from '../../../hooks/UseAlbumsRelase/UseAlbumRelase';
import {useAlbumListStore} from '../../../store/albumResaleStore/AlbumsResaleStore';
import {RootStackParamList} from '../../../types/screenStack';
import {RecientlyAlbumLoader} from '../../../utils/skeleton/loaders/RecientlyAlbums/RecientlyAudioLoader';
import {AlbumRelaseCrad} from '../components/AlbumRelaseCrad';
import styles from '../styles/AlbResale';

export const AlbumsResale = () => {
  const {isLoading: loadAlbum, data: albumsRelase, isError} = useAlbumRelase();
  const {setAlbumListStore} = useAlbumListStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (loadAlbum) {
    return <RecientlyAlbumLoader />;
  } else if (isError) {
    return (
      <View style={styles.albResaleContainer}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  const GoToAlbumScreen = () => {
    setAlbumListStore(albumsRelase!);
    navigation.navigate('AlbumsList');
  };

  return (
    <View style={styles.albResaleContainer}>
      <RNBounceable
        onPress={() => GoToAlbumScreen()}
        style={styles.mainTitleContainer}>
        <View>
          <Text style={styles.albumsResaleMainTitle}>Recently albums</Text>
        </View>
        <View>
          <View>
            <Text>
              <FontAwesome6 name="arrow-right-long" size={30} color="#fff" />
            </Text>
          </View>
        </View>
      </RNBounceable>
      <View style={styles.albumGrid}>
        {albumsRelase!.slice(0, 9).map((albumItem, index) => (
          <AlbumRelaseCrad key={index} albumRealseInfo={albumItem} />
        ))}
      </View>
    </View>
  );
};
