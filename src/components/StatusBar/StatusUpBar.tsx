import React from 'react';
import {StatusBar} from 'react-native';

interface StatusBarProps {
  backgroundColor: string;
}
export const StatusUpBar: React.FC<StatusBarProps> = ({backgroundColor}) => {
  return (
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor}
      barStyle="light-content"
    />
  );
};
