/**
 * @format
 */

import {QueryClientProvider} from '@tanstack/react-query';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import {name as appName} from './app.json';
import { PlaybackService } from 'services/TrackPlayerService/TrackPlayerService.ts';
import queryClient from 'services/client/QueryClient';
import Toast from 'react-native-toast-message';

const HiBeatApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <Toast />
    </QueryClientProvider>
  );
};

AppRegistry.registerComponent(appName, () => HiBeatApp);
TrackPlayer.registerPlaybackService(() => PlaybackService);
