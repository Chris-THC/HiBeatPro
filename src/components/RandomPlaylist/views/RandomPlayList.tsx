import React from 'react';
import styles from '../styles/RandPlayliStyle';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FontAwesome6} from '@expo/vector-icons';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {PlaylistCard} from '../components/PlaylistCard';
import {useRandomPlaylist} from 'hooks/UsePlaylist/UsePlaylist';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useRandomPlaylistStore} from 'store/randomPlatlistStore/randomPlaylistStore';
import {PlayListLoader} from 'utils/skeleton/loaders/PlayListLoader/PlayListLoader';

export const RandomPlayList = () => {
  const {isLoading, data: albumsArray, isError} = useRandomPlaylist();
  const navigateTo =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setRandomPlaylistStore} = useRandomPlaylistStore();

  const ChangeScreen = () => {
    setRandomPlaylistStore(albumsArray);
    navigateTo.navigate('RandomPlaylist');
  };

  if (isLoading) {
    return (
      <View>
        <PlayListLoader />
      </View>
    );
  } else if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={ChangeScreen}
        style={styles.mainTitleContainer}>
        <View>
          <Text style={styles.randomPlaylistMainTitle}>
            Some random playlist
          </Text>
        </View>
        <View>
          <View>
            <Text>
              <FontAwesome6 name="arrow-right-long" size={30} color="#fff" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        <View style={styles.mainContainer}>
          {albumsArray!.slice(0, 10).map((albumItem, index) => (
            <View style={{marginHorizontal: 8, marginBottom: 10}} key={index}>
              <PlaylistCard playlist={albumItem} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
