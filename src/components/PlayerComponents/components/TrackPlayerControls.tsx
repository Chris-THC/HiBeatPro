import {AntDesign, FontAwesome} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  handlerNextTrack,
  handlerPreviousTrack,
  togglePlayback,
} from '../../../services/TrackPlayerService/TrackPlayerEvents';
import {useIsTrackPlaying} from '../../../services/TrackPlayerService/TrackPlayerStates';

interface ColorProp {
  color: string;
}

export const TrackPlayerControls: React.FC<ColorProp> = ({color}) => {
  const isPlaying = useIsTrackPlaying();

  const NextTrack = () => {
    handlerNextTrack();
  };

  const PreviousTrack = () => {
    handlerPreviousTrack();
  };

  return (
    <View style={styles.controlsContainer}>
      <RNBounceable style={styles.btnNextNPrev} onPress={PreviousTrack}>
        <FontAwesome name="step-backward" size={25} color="#fff" />
      </RNBounceable>

      <RNBounceable
        style={[styles.btnPlayNPause, {backgroundColor: color}]}
        onPress={togglePlayback}>
        {isPlaying ? (
          <AntDesign name="pause" size={28} color={'#fff'} />
        ) : (
          <FontAwesome name="play" size={25} color={'#fff'} />
        )}
      </RNBounceable>

      <RNBounceable style={styles.btnNextNPrev} onPress={NextTrack}>
        <FontAwesome name="step-forward" size={25} color="#fff" />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '70%',
    height: 60,
  },
  btnNextNPrev: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPlayNPause: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000', // Color de la sombra
    shadowOffset: {width: 2, height: 3}, // Desplazamiento de la sombra
    shadowOpacity: 1, // Opacidad de la sombra
    shadowRadius: 20, // Radio de la sombra
    elevation: 4, // Elevación (para Android)
  },
});
