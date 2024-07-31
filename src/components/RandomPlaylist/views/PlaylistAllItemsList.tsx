import { FontAwesome6 } from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { RandomPlaylistInterface } from '../../../interfaces/randomPlayList/RandomPlaylist';
import { RootStackParamList } from '../../../types/screenStack';
import { PlaylistCard } from '../components/PlaylistCard';
import styles from '../styles/PlaylistAllItemsListStyles';

interface PropRandomPlaylistInfo {
  playlist: RandomPlaylistInterface[] | null | undefined;
}

export const PlaylistAllItemsList: React.FC<PropRandomPlaylistInfo> = ({
  playlist,
}) => {
  const navigateTo =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const GoBackScreen = () => {
    navigateTo.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <RNBounceable onPress={GoBackScreen} style={styles.mainTitleContainer}>
        <View>
          <Text>
            <FontAwesome6 name="arrow-left-long" size={30} color="#fff" />
          </Text>
        </View>
        <View>
          <Text style={styles.randomPlaylistMainTitle}>Random Playlist</Text>
        </View>
        <View></View>
      </RNBounceable>

      <FlashList
        data={playlist}
        numColumns={2}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={50}
        renderItem={({item}) => <PlaylistCard playlist={item} />}
      />
    </View>
  );
};
