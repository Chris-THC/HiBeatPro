import {
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UseSongDetaile} from 'hooks/UseSong/UseSong';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';
import {useModalTrack} from 'store/sheetModalTrack/ModalTrack';
import {useTrackStackStore} from 'store/trackStackStore/GetTrackStore';

export const ActionsAndOptions: React.FC = () => {
  const {setTrackOnStack} = useTrackStackStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const activeTrack = useActiveTrack();
  const {presentModal} = useBottomSheetStore();
  const {setTrackInfo} = useModalTrack();

  const GetTracksOnStack = async () => {
    try {
      const queue = await TrackPlayer.getQueue();
      setTrackOnStack(queue);
    } catch (error) {
      console.error('Error obteniendo la cola de reproducción:', error);
    }
  };

  const GotoStack = () => {
    navigation.navigate('StackPlayer');
    GetTracksOnStack();
  };

  const SubMenu = async () => {
    const songInfo = await UseSongDetaile(activeTrack!.id);
    setTrackInfo(songInfo!);
    presentModal();
  };

  return (
    <View style={styles.optionsContainer}>
      <RNBounceable style={styles.queueBotton} onPress={() => GotoStack()}>
        <MaterialIcons name="queue-music" size={35} color="#fff" />
      </RNBounceable>
      <RNBounceable onPress={() => SubMenu()} style={styles.moreAcctions}>
        <MaterialCommunityIcons name="menu-up-outline" size={40} color="#fff" />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 55,
  },
  queueBotton: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAcctions: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
