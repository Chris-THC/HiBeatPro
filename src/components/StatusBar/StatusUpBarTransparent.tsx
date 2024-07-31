import React from 'react';
import {StatusBar} from 'react-native';

export const StatusUpBarTransparent = () => {
  return (
    <StatusBar
      backgroundColor="transparent"
      translucent={true}
      barStyle={'default'}
    />
  );
};
