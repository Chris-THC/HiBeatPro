import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {getDownloadPermissionAndroid} from './PermissionAndroid';

const downloadFile = async (format: string, trackInfo: SongDetailed) => {
  try {
    const destinationPath = RNFetchBlob.fs.dirs.DownloadDir;
    const safeName = trackInfo?.name.replace(/[^a-zA-Z0-9]/g, '_');
    const safeArtist = trackInfo?.artist.name.replace(/[^a-zA-Z0-9]/g, '_');
    const destinationFilePath = `${destinationPath}/${safeName}_${safeArtist}.m4a`;
    const tempFilePath = `${destinationPath}/${safeName}_${safeArtist}-temp.m4a`; // Archivo temporal

    const config = RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'audio/aac',
        notification: true,
        path: destinationFilePath,
        description: 'Download file...',
        mediaScannable: true,
      },
    });

    await config
      .fetch('GET', format)
      .progress({count: 10}, (received, total) => {
        const percentage = Math.floor((received / total) * 100);
        console.log(`Progreso de la descarga: ${percentage}%`);
      });

    if (Platform.OS === 'android') {
      await RNFetchBlob.fs.scanFile([
        {path: destinationFilePath, mime: 'audio/aac'},
      ]);
    }

    // Agregar metadatos al archivo AAC utilizando FFmpegKit y un archivo temporal
    // const ffmpegCommand = `-y -i "${destinationFilePath}" -metadata Title="${trackInfo?.name}" -metadata Artist="${trackInfo?.artist.name}" -metadata Album="${trackInfo?.album.name}" -c:a copy "${tempFilePath}"`;
    const ffmpegCommand = `-y -i "${destinationFilePath}" -metadata Title="${trackInfo?.name}" -metadata Artist="${trackInfo?.artist.name}" -metadata Album="${trackInfo?.album.name}" -map_metadata 0 -c:a copy "${tempFilePath}"`;

    const session = await FFmpegKit.execute(ffmpegCommand);

    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      // Reemplazar el archivo original con el archivo temporal
      await RNFetchBlob.fs.unlink(destinationFilePath); // Eliminar el archivo original
      await RNFetchBlob.fs.mv(tempFilePath, destinationFilePath); // Renombrar el archivo temporal

      console.log(
        'Archivo AAC descargado y metadatos agregados en:',
        destinationFilePath,
      );
    } else {
      console.error(
        'Error al agregar metadatos con FFmpeg:',
        await session.getAllLogsAsString(),
      );
    }
  } catch (error) {
    console.error('Error al descargar el archivo AAC:', error);
  }
};

export const TrackDownloader = (format: string, trackInfo: SongDetailed) => {
  if (Platform.OS === 'android') {
    getDownloadPermissionAndroid().then(granted => {
      if (granted) {
        downloadFile(format, trackInfo);
      }
    });
  }
};
