import {ActiveTrackCrad} from 'components/ActiveTrackCrad/ActiveTrackCrad';
import {SheetModal} from 'components/BottomSheetModal/SheetModal';
import {SearchForm} from 'components/SearchComponents/components/SearchForm';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import {TopTabNavigator} from 'navigation/TopTabNavigaatot';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Search = () => {
  return (
    <View style={styles.container}>
      <StatusUpBar backgroundColor={colorBase} />
      <SearchForm />
      <TopTabNavigator />
      <ActiveTrackCrad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBase,
  },
});
