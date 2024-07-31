import axios from 'axios';
import {AlbumStreaming} from '../../interfaces/AlbumSearch/AlbumStreaming';

export const streamingAlbumByPlaylistId = async (idPlaylist: string, imgCover: string,): Promise<AlbumStreaming[] | null> => {
  try {
    let properUrl = `https://m.youtube.com/playlist?list=${idPlaylist}`;
    const resp = await axios.get(properUrl);

    // Scrape json inside script tag
    let ytInitialData = JSON.parse(
      /(?:window\["ytInitialData"\])|(?:ytInitialData) =.*?({.*?});/s.exec(
        resp.data,
      )?.[1] || '{}',
    );
    let listData =
      ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
        .content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
        .playlistVideoListRenderer;
    let info = listData.contents;

    let streamingAlbum = info.map((track: any) => {
      let sendInfo = {
        videoId: track.playlistVideoRenderer.videoId,
        title: track.playlistVideoRenderer.title.runs[0].text,
        artist: track.playlistVideoRenderer.shortBylineText.runs[0].text,
        duration: track.playlistVideoRenderer.lengthSeconds,
        artwork: imgCover,
      };
      return sendInfo;
    });

    return streamingAlbum;
  } catch (err) {
    console.log(`Invalid playlistId! = ${idPlaylist} Not Found! `);
    return null;
  }
};
