import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ArtistDetailed } from 'interfaces/SerachInterface/ArtistDetails';
import { SongDetailed } from 'interfaces/SerachInterface/SearchTracks';
import YTMusic from 'ytmusic-api';

const ytmusic = new YTMusic();

export const serachTracksFuntion = async (track: string): Promise<SongDetailed[]|any> => {
  try {
    await ytmusic.initialize();
    const searchInfo = await ytmusic.searchSongs(track);
    return searchInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const serachArtistFuntion = async (artist: string): Promise<ArtistDetailed[]|any> => {
  try {
    await ytmusic.initialize();
    const artistInfo = await ytmusic.searchArtists(artist)
    return artistInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useSearcTracksResult = (track: string): UseQueryResult<SongDetailed[], Error> => {
  return useQuery({
    queryKey: ['useSearchTracksKey', serachTracksFuntion],
    queryFn: () => serachTracksFuntion(track),
  });
};
