import {UseQueryResult, useQuery} from '@tanstack/react-query';
import YTMusic from 'ytmusic-api';
import {ArtistFull} from '../../interfaces/ArtistInterface/YTMuiscArtistInterface';
const ytmusic = new YTMusic();

const artistInfoFunction = async (artistId: string): Promise<ArtistFull | null> => {
  try {
    await ytmusic.initialize();
    const artistInfo = await ytmusic.getArtist(artistId);
    return artistInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useArtistInfoById = (artistId: string): UseQueryResult<ArtistFull, Error> => {
  return useQuery({
    queryKey: ['artistInfoById', artistId], // Use artistId in queryKey
    queryFn: () => artistInfoFunction(artistId),
  });
};
