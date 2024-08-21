import axios from 'axios';
import { AlbumSearch } from 'interfaces/AlbumSearch/AlbumSearch';

export const UseIdPlayList = async (browseId: string): Promise<AlbumSearch|null> => {
  try {
    const url = `https://music.youtube.com/youtubei/v1/browse?prettyPrint=false`;

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

    const response = await axios.post(url, data);

    // const tracksList =
    //   response.data.header.musicDetailHeaderRenderer.menu.menuRenderer.items[0]
    //     .menuNavigationItemRenderer.navigationEndpoint.watchPlaylistEndpoint
    //     .playlistId;

    const results = {
        playlistId:
          response.data.header.musicDetailHeaderRenderer.menu.menuRenderer
            .items[0].menuNavigationItemRenderer.navigationEndpoint
            .watchPlaylistEndpoint.playlistId,
        name: response.data.header.musicDetailHeaderRenderer.title.runs[0].text,
        artist: {
          artistId:
            response.data.header.musicDetailHeaderRenderer.secondTitle.runs[1]
              .navigationEndpoint.browseEndpoint.browseId,
          name: response.data.header.musicDetailHeaderRenderer.secondTitle.runs[1]
            .text,
        },
        year: response.data.header.musicDetailHeaderRenderer.subtitle.runs[2]
          .text,
        type: response.data.header.musicDetailHeaderRenderer.subtitle.runs[0]
          .text,
  
        thumbnails:
          response.data.header.musicDetailHeaderRenderer.thumbnail
            .croppedSquareThumbnailRenderer.thumbnail.thumbnails,
      };

    return results;
  } catch (error) {
    console.info(error);
    return null;
  }
};
