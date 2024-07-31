import axios from 'axios';
import {AddTrack} from 'react-native-track-player';
import { getStreamingData } from 'services/streaming/StreamingTrack';

export const SuggestionsTrackListFuntion = async (idTrack: string): Promise<AddTrack[] | null> => {
  const url =
    'https://music.youtube.com/youtubei/v1/next?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30&prettyPrint=false';

  const data = {
    context: {
      client: {
        clientName: 'IOS_MUSIC',
        clientVersion: '5.26.1',
        gl: 'US',
        hl: 'en',
        osName: 'IOS',
      },
      user: {
        lockedSafetyMode: false,
      },
      request: {
        useSsl: true,
        internalExperimentFlags: [],
        consistencyTokenJars: [],
      },
    },
    enablePersistentPlaylistPanel: true,
    isAudioOnly: true,
    playlistId: `RDAMVM${idTrack}`,
  };

  try {
    const response = await axios.post(url, data);
    const apiInfo = response.data;
    const arrInfo =
      apiInfo.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
        .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
        .musicQueueRenderer.content.playlistPanelRenderer.contents;

    // Utiliza Promise.all para esperar a que todas las promesas se resuelvan
    const infoPromises = arrInfo.map(async (item: any) => {
      const {videoId} = item?.playlistPanelVideoRenderer; // Desestructurar con valor predeterminado
      return await getStreamingData(videoId);
    });
    const similarTracks = await Promise.all(infoPromises);
    return similarTracks;
  } catch (err) {
    console.log(`Error ==>: ${err}`);
    return null;
  }
};
