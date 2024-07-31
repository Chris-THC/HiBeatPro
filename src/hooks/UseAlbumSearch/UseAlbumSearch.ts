import axios from 'axios';
import {AlbumSearch} from '../../interfaces/AlbumSearch/AlbumSearch';

export const searchAlbumsByAxios = async (somethingQuery: string): Promise<AlbumSearch[] | null> => {
  const URL = `https://music.youtube.com/youtubei/v1/search?prettyPrint=false`;

  const body = {
    context: {
      client: {
        clientName: 'WEB_REMIX',
        clientVersion: '0.1',
      },
    },
    params: 'EgWKAQIYAWoSEAMQBBAOEAoQCRAVEAUQERAQ',
    query: somethingQuery,
    formData: {
      selectedValues: ['GB'],
    },
  };

  try {
    const response = await axios.post(URL, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const responseData =
      response.data.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[0].musicShelfRenderer.contents;

    const albumInfo = responseData.map((album: any) => ({
      playlistId:
        album.musicResponsiveListItemRenderer.menu.menuRenderer.items[0]
          .menuNavigationItemRenderer.navigationEndpoint.watchPlaylistEndpoint
          .playlistId,
      name: album.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
      artist: {
        artistId:
          album.musicResponsiveListItemRenderer.menu.menuRenderer.items[6]
            .menuNavigationItemRenderer.navigationEndpoint.browseEndpoint,
        name: album.musicResponsiveListItemRenderer.flexColumns[1]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text,
      },
      year: album.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text,
      type: album.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
      thumbnails:
        album.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer
          .thumbnail.thumbnails,
    }));

    return albumInfo;
  } catch (error) {
    return null;
  }
};
