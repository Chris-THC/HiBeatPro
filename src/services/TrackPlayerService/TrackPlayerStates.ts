import {useEffect, useState} from 'react';
import TrackPlayer, {Event, State, useTrackPlayerEvents} from 'react-native-track-player';

const events = [Event.PlaybackState, Event.PlaybackError];

export const useIsTrackPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackState) {
      switch (event.state) {
        case State.Playing:
          setIsPlaying(true);
          break;
        case State.Paused:
        case State.Stopped:
        case State.Buffering:
        default:
          setIsPlaying(false);
          break;
      }
    }
  });

  useEffect(() => {
    const getInitialState = async () => {
      const state = await TrackPlayer.getState();
      setIsPlaying(state === State.Playing);
    };
    getInitialState();
  }, []);

  return isPlaying;
};
