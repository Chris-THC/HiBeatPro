import {MaterialIcons, SimpleLineIcons, Fontisto} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useTrackStackStore} from '../../../store/trackStackStore/GetTrackStore';
import {RootStackParamList} from '../../../types/screenStack';

export const ActionsAndOptions: React.FC = () => {
  const {setTrackOnStack} = useTrackStackStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  return (
    <View style={styles.optionsContainer}>
      <RNBounceable style={styles.queueBotton} onPress={() => GotoStack()}>
        <MaterialIcons name="queue-music" size={38} color="#fff" />
      </RNBounceable>
      <RNBounceable style={styles.moreAcctions}>
        <Fontisto name="more-v" size={25} color="#fff" />
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
