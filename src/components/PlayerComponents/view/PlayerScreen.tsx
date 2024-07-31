import {AntDesign} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import {AndroidColors} from 'interfaces/colorsInterface/Colors';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useActiveTrack} from 'react-native-track-player';
import {RootStackParamList} from 'scrrenTypes/screenStack';
import {coverImageDefault} from 'utils/assets/Images';
import {ImageColorPalette} from 'utils/colors/ColorsFromImg';
import {ActionsAndOptions} from '../components/ActionsAndOptions';
import {ProgressAndTrackInfo} from '../components/ProgressAndTrackInfo';
import {TrackCover} from '../components/TrackCover';
import {TrackPlayerControls} from '../components/TrackPlayerControls';

export const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const [colorCover, setColorCover] = useState<AndroidColors | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getColorImage = useCallback(async () => {
    const colorImg = await ImageColorPalette(
      activeTrack?.artwork || coverImageDefault,
    );
    setColorCover(colorImg);
  }, [activeTrack?.artwork]);

  useEffect(() => {
    getColorImage();
  }, [activeTrack?.artwork]);

  const GoBackComponent = () => {
    return (
      <RNBounceable
        onPress={() => navigation.goBack()}
        style={styles.btnGoBack}>
        <AntDesign name="down" size={26} color="#ccc" />
      </RNBounceable>
    );
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[colorCover?.dominant || colorBase, '#26272b', '#26272b']}
      locations={[0.003, 1, 0.1]}>
      <StatusUpBar backgroundColor={colorCover?.dominant || colorBase} />
      <GoBackComponent />
      <View style={styles.imageContainer}>
        <TrackCover cover={activeTrack?.artwork} />
      </View>
      <View style={styles.titleProgressContainer}>
        <ProgressAndTrackInfo
          lightMuted={colorCover?.average || '#5361b5'}
          mutued={colorCover?.average || '#088bba'}
        />
      </View>
      <View style={styles.controlsContainer}>
        <TrackPlayerControls color={colorCover?.average || '#088bba'} />
      </View>
      <View style={styles.actionsContainer}>
        <ActionsAndOptions />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
  },
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProgressContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // style btn go back:
  btnGoBack: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 2,
    top: -5,
    left: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
