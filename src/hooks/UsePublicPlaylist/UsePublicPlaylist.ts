import axios from 'axios';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import { PublicPlaylist } from 'interfaces/PublicPlaylist/PublicPlaylist';

export const publicPlayList = async (browseId: string): Promise<PublicPlaylist[] | null> => {
  let keyAPI = 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc';

  const url = `https://music.youtube.com/youtubei/v1/browse?key=${keyAPI}`;

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
    browseId: `${browseId}`,
  };

  try {
    const response = await axios.post(url, data);

    const tracksList =
      response.data.contents.singleColumnBrowseResultsRenderer.tabs[0]
        .tabRenderer.content.sectionListRenderer.contents[0]
        .musicPlaylistShelfRenderer.contents;

    const arrPlayList = tracksList.map((playlist: any) => ({
      videoId:
        playlist.musicTwoColumnItemRenderer.menu.menuRenderer.items[1]
          .menuServiceItemRenderer.serviceEndpoint.queueAddEndpoint.queueTarget
          .videoId,

      name: playlist.musicTwoColumnItemRenderer.menu.menuRenderer.title
        .musicMenuTitleRenderer.primaryText.runs[0].text,

      artist:
        playlist.musicTwoColumnItemRenderer.menu.menuRenderer.title
          .musicMenuTitleRenderer.secondaryText.runs[0].text,

      duration:
        playlist.musicTwoColumnItemRenderer.menu.menuRenderer.title
          .musicMenuTitleRenderer.secondaryText.runs[2].text,

      thumbnails:
        playlist.musicTwoColumnItemRenderer.thumbnail.musicThumbnailRenderer
          .thumbnail.thumbnails,
    }));

    return arrPlayList;
  } catch (err) {
    return null;
  }
};

export const usePlaylistPublic = (browseId: string): UseQueryResult<PublicPlaylist[], Error> => {
  return useQuery({
    queryKey: ['publicPlaylistKey', publicPlayList],
    queryFn: () => publicPlayList(browseId),
  });
};
