import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Song} from 'interfaces/ArtistInterface/YTMuiscArtistInterface';
import Toast from 'react-native-toast-message';

const successToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Download complete',
    text2: 'Your track has been successfully downloaded ✅',
  });
};

const errorToast = () => {
  Toast.show({
    type: 'error',
    text1: 'Download failed',
    text2: 'There was an error downloading the track ⚠️',
  });
};

const downloadFile = async (
  format: string,
  trackInfo: SongDetailed | Song,
  trckImg: string,
) => {
  try {
    const {fs} = RNFetchBlob;
    const safeName = trackInfo?.name.replace(/[^a-zA-Z0-9]/g, '_');
    const safeArtist = trackInfo?.artist.name.replace(/[^a-zA-Z0-9]/g, '_');

    // Ruta de la carpeta en la memoria interna
    const directoryPath = `${fs.dirs.DownloadDir}`;

    // Verifica si la carpeta existe, si no, la crea
    const isDir = await fs.isDir(directoryPath);
    if (!isDir) {
      await fs.mkdir(directoryPath);
    }

    const destinationFilePath = `${directoryPath}/${safeName}_${safeArtist}.m4a`;
    const tempFilePath = `${destinationFilePath}-temp.m4a`; // Archivo temporal
    const tempImagePath = `${directoryPath}/cover.jpg`; // Ruta temporal para la imagen

    // Descargar la imagen de la URL y guardarla en la carpeta HiBeatsTracks
    await RNFetchBlob.config({fileCache: true, path: tempImagePath}).fetch(
      'GET',
      trckImg,
    );

    const configOptions = {
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'audio/aac',
        notification: true,
        path: destinationFilePath,
        description: 'Download file...',
        mediaScannable: true,
        fileCache: true,
      },
    };
    // const configOptions = {
    //   fileCache: true,
    //   path: destinationFilePath,
    //   description: 'Downloading file...',
    //   notification: true,
    // };

    // Descargar el archivo de audio
    await RNFetchBlob.config(configOptions)
      .fetch('GET', format)
      .progress((received, total) => {
        console.log(
          `Download progress: ${Math.floor((received / total) * 100)}%`,
        );
      });

    // Agregar metadatos y la imagen de portada al archivo AAC utilizando FFmpegKit
    const ffmpegCommand = `-y -i "${destinationFilePath}" -i "${tempImagePath}" -metadata Title="${
      trackInfo?.name
    }" -metadata Artist="${trackInfo?.artist.name}" -metadata Album="${
      trackInfo?.album!.name
    }" -map 0 -map 1 -c copy -disposition:v:0 attached_pic "${tempFilePath}"`;

    const session = await FFmpegKit.execute(ffmpegCommand);
    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      // Reemplazar el archivo original con el archivo temporal
      await RNFetchBlob.fs.unlink(destinationFilePath);
      await RNFetchBlob.fs.mv(tempFilePath, destinationFilePath);

      successToast();
    } else {
      errorToast();
    }

    // Limpiar archivo de imagen temporal
    await RNFetchBlob.fs.unlink(tempImagePath);
  } catch (error) {
    console.error('Error during download:', error);
    errorToast();
  }
};

export const TrackDownloader = (
  format: string,
  trackInfo: SongDetailed | Song,
  trckImg: string,
) => {
  if (Platform.OS === 'android') {
    downloadFile(format, trackInfo, trckImg);
  }
};
