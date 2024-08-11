import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {getDownloadPermissionAndroid} from './PermissionAndroid';

const downloadFile = async (videoId: string) => {
  try {
    // Obtener la ruta de la carpeta de descargas
    const destinationPath = RNFetchBlob.fs.dirs.DownloadDir;
    // Ruta completa del archivo
    const destinationFilePath = `${destinationPath}/testAudio.mp3`;
    // Elige el formato de audio con la mejor calidad
    const format: string = 'url_Test';

    const infoTrack = {
      title: 'Nice to Meet You',
      artist: 'Imagine Dragons',
      album: 'LOOM',
      genre: 'Alternative',
      date: '2024-05-24',
      image:
        'https://lh3.googleusercontent.com/HXl1-8EFmkheZcYoPiFgDe1HCeaBaZDWY4yxjJsaZqSasbompkowFh7UC7vxIIARnXh_5uTBLAkHs_qz=w544-h544-l90-rj',
    };

    // Configura RNFetchBlob para guardar el archivo en la carpeta de descargas
    const config = RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'audio/mpeg',
        notification: true,
        path: destinationFilePath,
        description: 'Descargando archivo MP3...',
        mediaScannable: true,
      },
    });

    // Descarga el archivo MP3 utilizando RNFetchBlob con seguimiento del progreso
    const resp = await config
      .fetch('GET', format)
      .progress({count: 10}, (received, total) => {
        const percentage = Math.floor((received / total) * 100);
        console.log(`Progreso de la descarga: ${percentage}%`);
      });

    if (Platform.OS === 'android') {
      await RNFetchBlob.fs.scanFile([
        {path: destinationFilePath, mime: 'application/mp3'},
      ]);
    }

    console.log('Archivo MP3 descargado en:', resp.path());
  } catch (error) {
    console.error('Error al descargar el archivo MP3:', error);
  }
};

export const TrackDownloader = (videoId: string) => {
  if (Platform.OS === 'android') {
    getDownloadPermissionAndroid().then(granted => {
      if (granted) {
        downloadFile(videoId);
      }
    });
  }
};
