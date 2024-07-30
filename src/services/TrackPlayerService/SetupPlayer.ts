import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

export const SetupPlayer = async () => {
  try {
    const options = {
      autoHandleInterruptions: true,
      permanent: true,
    };
    await TrackPlayer.setupPlayer(options);
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      // stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.Skip,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.Skip,
      ],
      progressUpdateEventInterval: 2,
    });
  } catch (error) {
    console.log(error);
  }
};
