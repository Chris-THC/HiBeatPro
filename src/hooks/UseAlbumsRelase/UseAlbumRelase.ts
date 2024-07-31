import axios from 'axios';
import {AlbumRelaseInterface} from '../../interfaces/AlbumsRelase/AlbumsRelase';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {YTMusicKey} from '../../enums/Enums';

export const AlbumRelaseFuntion = async () => {
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

      request: {
        useSsl: true,
        internalExperimentFlags: [],
        consistencyTokenJars: [],
      },
    },
    enablePersistentPlaylistPanel: true,
    isAudioOnly: true,

    browseId: 'FEmusic_explore',
  };

  try {
    const response = await axios.post(url, data);

    const apiInfo = response.data;

    const arrQuckStartAlbums =
      apiInfo.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[1].musicCarouselShelfRenderer
        .contents;

    const infoPromises = arrQuckStartAlbums.map(async (album: any) => {
      const newArry = album.musicTwoRowItemRenderer;

      return {
        browseId: newArry.navigationEndpoint.browseEndpoint.browseId,
        artwork:
          newArry.thumbnailRenderer.musicThumbnailRenderer.thumbnail
            .thumbnails[2].url,
        title: newArry.title.runs[0].text,
        artist: newArry.subtitle.runs[2].text,
        playlistId:
          newArry.menu.menuRenderer.items[0].menuNavigationItemRenderer
            .navigationEndpoint.watchPlaylistEndpoint.playlistId,
      };
    });
    const AlbumsList = await Promise.all(infoPromises);
    return AlbumsList;
  } catch (err) {
    console.log(`Error in get info from QuickStartAlbums: ${err}`);
    return null;
  }
};

export const useAlbumRelase = (): UseQueryResult<AlbumRelaseInterface[], Error> => {
  return useQuery({
    queryKey: ['albumRelaseFN'],
    queryFn: AlbumRelaseFuntion,
  });
};
