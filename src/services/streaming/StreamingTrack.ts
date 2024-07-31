import axios from 'axios';
import {AddTrack, Track} from 'react-native-track-player';

export const getStreamingData = async (idTrack: string): Promise<AddTrack> => {
  try {
    let keyId = 'AIzaSyBAETezhkwP0ZWA02RsqT1zu78Fpt0bC_s';
    const url = `https://www.youtube.com/youtubei/v1/player?key=${keyId}`;

    const requestBody = {
      contentCheckOk: true,
      context: {
        client: {
          clientName: 'IOS_MUSIC',
          clientVersion: '5.26.1',
          gl: 'US',
          hl: 'en',
          osName: 'IOS',
        },
        user: {
          lockedSafetyMode: false,
        },
      },
      racyCheckOk: true,
      videoId: `${idTrack}`,
    };

    const response = await axios.post(url, requestBody);
    const data = response.data;

    let formattedUrl =
      (data.streamingData &&
        data.streamingData.adaptiveFormats &&
        data.streamingData.adaptiveFormats[7]) ||
      (data.streamingData &&
        data.streamingData.adaptiveFormats &&
        data.streamingData.adaptiveFormats[6]) ||
      'https://aac.saavncdn.com/694/f3ca9af9ec18aadbf685b83d88c0ca2c_320.mp4';

    return {
      id: data.videoDetails.videoId,
      url: formattedUrl.url
        ? formattedUrl.url
        : // Corregir esta linea y poner un sonido que se pueda reproducir
          require('../../../assets/music/effect.mp3'),
      title: data.videoDetails.title,
      artist: data.videoDetails.author,
      artwork:
        data.videoDetails?.thumbnail?.thumbnails[4]?.url ||
        'https://coreldrawdesign.com/resources/previews/preview-errorpage-404-background-1614485326.jpg',
      duration: data.videoDetails.lengthSeconds,
    };
  } catch (error) {
    console.error('Error ==> desde la API:', error);
    return {
      url: '',
      artwork: '',
    };
  }
};
