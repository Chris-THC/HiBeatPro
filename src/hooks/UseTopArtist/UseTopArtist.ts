import axios from 'axios';
import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {YTMusicKey} from '../../enums/Enums';
import {TopArtistInterface} from '../../interfaces/TopArtistInterface/TopArtist';

//Here we get all users list data
export const getTopArtistAxios = async () => {
  const URL = `https://music.youtube.com/youtubei/v1/browse?key=${YTMusicKey}`;

  // Definir el cuerpo de la petición
  const body = {
    context: {
      client: {
        clientName: 'WEB_REMIX',
        clientVersion: '0.1',
      },
    },
    browseId: 'FEmusic_charts',
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

    const getArtistList =
      response.data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]
        ?.tabRenderer?.content?.sectionListRenderer?.contents?.[2]
        ?.musicCarouselShelfRenderer?.contents;

    if (!getArtistList) {
      throw new Error('No se encontró la lista de artistas en la respuesta.');
    }

    const arrArtist = getArtistList.map((item: any) => ({
      idArtist:
        item?.musicResponsiveListItemRenderer?.navigationEndpoint
          ?.browseEndpoint?.browseId,
      nameArtist:
        item?.musicResponsiveListItemRenderer?.flexColumns?.[0]
          ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs?.[0]?.text,
      imgCover:
        item?.musicResponsiveListItemRenderer?.thumbnail?.musicThumbnailRenderer
          ?.thumbnail?.thumbnails,
    }));

    return arrArtist;
  } catch (error) {
    console.error('Error al obtener los artistas:', error);
    return null;
  }
};

export const useTopArtistGlobal = (): UseQueryResult<TopArtistInterface[], Error> => {
  return useQuery({
    queryKey: ['topArtist'],
    queryFn: getTopArtistAxios,
  });
};
