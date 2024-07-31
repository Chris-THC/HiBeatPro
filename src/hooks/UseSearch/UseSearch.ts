import {UseQueryResult, useQuery} from '@tanstack/react-query';
import { SearchResult } from 'interfaces/SerachInterface/SearchResult';
import YTMusic from 'ytmusic-api';
const ytmusic = new YTMusic();

export const serachFuntion = async (something: string): Promise<any> => {
  try {
    await ytmusic.initialize();
    const searchInfo = await ytmusic.search(something);
    return searchInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useSearchResult = (something: string): UseQueryResult<SearchResult, Error> => {
  return useQuery({
    queryKey: ['useSearchKey', serachFuntion],
    queryFn: () => serachFuntion(something),
  });
};
