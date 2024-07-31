import {UseQueryResult, useQuery} from '@tanstack/react-query';
import { streamingAlbumByPlaylistId } from 'hooks/UseStreamingAlbum/UseStreamingAlbum';
import { AlbumStreaming } from 'interfaces/AlbumSearch/AlbumStreaming';

const albumStreamingFunction = async (idPlaylist: string, imgCover: string): Promise<AlbumStreaming[] | null> => {
  try {
    const artistInfo = await streamingAlbumByPlaylistId(idPlaylist, imgCover);
    return artistInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useStreamingAlbum = (playlistId: string, imgCover: string): UseQueryResult<AlbumStreaming[], Error> => {
  return useQuery({
    queryKey: ['streamingAlbum', playlistId, imgCover],
    queryFn: () => albumStreamingFunction(playlistId, imgCover),
  });
};
