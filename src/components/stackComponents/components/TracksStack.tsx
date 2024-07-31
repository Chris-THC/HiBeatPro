import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {Track} from 'react-native-track-player';
import {TrackCard} from './TrackListOnStack';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {handlerPlay} from 'services/TrackPlayerService/TrackPlayerEvents';

interface PropsTrackList {
  topSongs: Track[];
}

export const StackTracks: React.FC<PropsTrackList> = ({topSongs}) => {
  const navigateTo =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectTrack = async (position: number) => {
    await TrackPlayer.skip(position);
    handlerPlay();
  };

  return (
    <View style={{minHeight: '100%'}}>
      <View style={styles.contentSubTitles}>
        <RNBounceable
          style={styles.btnGoBack}
          onPress={() => navigateTo.goBack()}>
          <AntDesign name="down" size={30} color="#fff" />
        </RNBounceable>
        <View>
          <Text style={styles.subTitleText}>Tracks into the stack</Text>
        </View>
      </View>

      <FlashList
        data={topSongs}
        numColumns={1}
        scrollEnabled={true}
        estimatedItemSize={40}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TrackCard
            track={item}
            position={index}
            onTrackSelect={handleSelectTrack}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentSubTitles: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subTitleText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    marginVertical: 5,
  },
  btnGoBack: {
    height: 45,
    width: 45,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 30,
  },
});
