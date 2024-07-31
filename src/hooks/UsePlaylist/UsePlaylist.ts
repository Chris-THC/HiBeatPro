import {UseQueryResult, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {YTMusicKey} from '../../enums/Enums';
import {RandomPlaylistInterface} from '../../interfaces/randomPlayList/RandomPlaylist';

//Here we get all users list data
export const randomPlaylistFuncion = async () => {
  const url = `https://music.youtube.com/youtubei/v1/browse?key=${YTMusicKey}`;

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
    enablePersistentPlaylistPanel: true,
    isAudioOnly: true,
    browseId: 'FEmusic_moods_and_genres_category',
    params: `ggMPOg1uX1NPTld3SDN3WGs4`,
  };

  try {
    const response = await axios.post(url, data);

    const tracksList =
      response.data.contents.singleColumnBrowseResultsRenderer.tabs[0]
        .tabRenderer.content.sectionListRenderer.contents[2]
        .musicCarouselShelfRenderer.contents;

    const infoPromises = tracksList.map(async (playList: any) => {
      return {
        artwork:
          playList.musicTwoRowItemRenderer.thumbnailRenderer
            .musicThumbnailRenderer.thumbnail.thumbnails[2].url,
        title: playList.musicTwoRowItemRenderer.title.runs[0].text,
        browseId:
          playList.musicTwoRowItemRenderer.navigationEndpoint.browseEndpoint
            .browseId,
      };
    });
    const tracksInfo = await Promise.all(infoPromises);
    return tracksInfo;
  } catch (err) {
    console.log(`Error ===> : ${err}`);
    return null;
  }
};

export const useRandomPlaylist = (): UseQueryResult<RandomPlaylistInterface[], Error> => {
  return useQuery({
    queryKey: ['randomPlaylist'],
    queryFn: randomPlaylistFuncion,
  });
};
