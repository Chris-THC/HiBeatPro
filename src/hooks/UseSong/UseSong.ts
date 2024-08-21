import axios from 'axios';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';

export const UseSongDetaile = async (videoId: string): Promise<SongDetailed | null> => {
  const convertToSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const url = `https://music.youtube.com/youtubei/v1/next?prettyPrint=false`;

  const data = {
    context: {
      client: {
        clientName: 'IOS_MUSIC',
        clientVersion: '5.26.1',
        gl: 'GB',
        hl: 'en',
        osName: 'IOS',
      },
    },
    videoId: `${videoId}`,
  };

  try {
    const response = await axios.post(url, data);

    const resTrack = response.data;

    const trackResponse = {
      type: 'SONG',
      videoId: resTrack.currentVideoEndpoint.watchEndpoint.videoId,
      name: resTrack.contents.singleColumnMusicWatchNextResultsRenderer
        .lockScreen.lockScreenRenderer.title.runs[0].text,
      artist: {
        artistId:
          resTrack.contents.singleColumnMusicWatchNextResultsRenderer
            .tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer
            .content.musicQueueRenderer.content.playlistPanelRenderer
            .contents[0].playlistPanelVideoRenderer.shortBylineText.runs[0]
            .navigationEndpoint.browseEndpoint.browseId,
        name: resTrack.contents.singleColumnMusicWatchNextResultsRenderer
          .tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer
          .content.musicQueueRenderer.content.playlistPanelRenderer.contents[0]
          .playlistPanelVideoRenderer.shortBylineText.runs[0].text,
      },
      album: {
        albumId:
          resTrack.contents.singleColumnMusicWatchNextResultsRenderer
            .tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer
            .content.musicQueueRenderer.content.playlistPanelRenderer
            .contents[0].playlistPanelVideoRenderer.menu.menuRenderer.items[5]
            .menuNavigationItemRenderer.navigationEndpoint.browseEndpoint
            .browseId,
        name: resTrack.contents.singleColumnMusicWatchNextResultsRenderer
          .lockScreen.lockScreenRenderer.albumText.runs[0].text,
      },
      duration: convertToSeconds(
        resTrack.contents.singleColumnMusicWatchNextResultsRenderer.lockScreen
          .lockScreenRenderer.lengthText.runs[0].text,
      ),
      thumbnails:
        resTrack.onResponseReceivedEndpoints[0]
          .musicUpdateRecentlyPlayedWidgetCommand.recentlyPlayedItem.thumbnail
          .thumbnails,
    };
    return trackResponse;
  } catch (error) {
    console.log(`Hay un error en la funcion SONG: ${error}`);
    return null;
  }
};
