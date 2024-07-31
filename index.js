/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {QueryClientProvider} from '@tanstack/react-query';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from 'services/TrackPlayerService/TrackPlayerService';
import queryClient from 'services/client/QueryClient';

const HiBeatMain = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  };
  

AppRegistry.registerComponent(appName, () => HiBeatMain);
TrackPlayer.registerPlaybackService(() => PlaybackService);
