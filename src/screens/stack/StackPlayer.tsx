import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StatusUpBar} from '../../components/StatusBar/StatusUpBar';
import {StackTracks} from '../../components/stackComponents/components/TracksStack';
import {colorBase} from '../../enums/AppColors';
import {useTrackStackStore} from '../../store/trackStackStore/GetTrackStore';

export const StackPlayer: React.FC = () => {
  const {trackOnStack} = useTrackStackStore();

  return (
    <View style={styles.contentStack}>
      <StatusUpBar backgroundColor={colorBase} />
      <StackTracks topSongs={trackOnStack!} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentStack: {
    flex: 1,
    backgroundColor: colorBase,
    minHeight: '100%',
  },
  textStyles: {
    fontSize: 16,
    color: '#fff',
  },
});
