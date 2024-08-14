import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {SongDetailed} from 'interfaces/SerachInterface/SearchTracks';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {getDownloadPermissionAndroid} from './PermissionAndroid';

// const downloadFile = async (format: string, trackInfo: SongDetailed) => {
//   try {
//     const destinationPath = RNFetchBlob.fs.dirs.DownloadDir;
//     const safeName = trackInfo?.name.replace(/[^a-zA-Z0-9]/g, '_');
//     const safeArtist = trackInfo?.artist.name.replace(/[^a-zA-Z0-9]/g, '_');
//     const destinationFilePath = `${destinationPath}/${safeName}_${safeArtist}.m4a`;
//     const tempFilePath = `${destinationPath}/${safeName}_${safeArtist}-temp.m4a`; // Archivo temporal

//     const imageTrack:string = "https://lh3.googleusercontent.com/HXl1-8EFmkheZcYoPiFgDe1HCeaBaZDWY4yxjJsaZqSasbompkowFh7UC7vxIIARnXh_5uTBLAkHs_qz=w544-h544-l90-rj"

//     const config = RNFetchBlob.config({
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         mime: 'audio/aac',
//         notification: true,
//         path: destinationFilePath,
//         description: 'Download file...',
//         mediaScannable: true,
//       },
//     });

//     await config
//       .fetch('GET', format)
//       .progress({count: 10}, (received, total) => {
//         const percentage = Math.floor((received / total) * 100);
//         console.log(`Progreso de la descarga: ${percentage}%`);
//       });

//     if (Platform.OS === 'android') {
//       await RNFetchBlob.fs.scanFile([
//         {path: destinationFilePath, mime: 'audio/aac'},
//       ]);
//     }

//     // Agregar metadatos al archivo AAC utilizando FFmpegKit y un archivo temporal
//     const ffmpegCommand = `-y -i "${destinationFilePath}" -metadata Title="${trackInfo?.name}" -metadata Artist="${trackInfo?.artist.name}" -metadata Album="${trackInfo?.album.name}" -map_metadata 0 -c:a copy "${tempFilePath}"`;

//     const session = await FFmpegKit.execute(ffmpegCommand);

//     const returnCode = await session.getReturnCode();

//     if (returnCode.isValueSuccess()) {
//       // Reemplazar el archivo original con el archivo temporal
//       await RNFetchBlob.fs.unlink(destinationFilePath); // Eliminar el archivo original
//       await RNFetchBlob.fs.mv(tempFilePath, destinationFilePath); // Renombrar el archivo temporal

//       console.log(
//         'Archivo AAC descargado y metadatos agregados en:',
//         destinationFilePath,
//       );
//     } else {
//       console.error(
//         'Error al agregar metadatos con FFmpeg:',
//         await session.getAllLogsAsString(),
//       );
//     }
//   } catch (error) {
//     console.error('Error al descargar el archivo AAC:', error);
//   }
// };


const downloadFile = async (format: string, trackInfo: SongDetailed, trckImg:string) => {
  try {
    const destinationPath = RNFetchBlob.fs.dirs.DownloadDir;
    const safeName = trackInfo?.name.replace(/[^a-zA-Z0-9]/g, '_');
    const safeArtist = trackInfo?.artist.name.replace(/[^a-zA-Z0-9]/g, '_');
    const destinationFilePath = `${destinationPath}/${safeName}_${safeArtist}.m4a`;
    const tempFilePath = `${destinationPath}/${safeName}_${safeArtist}-temp.m4a`; // Archivo temporal
    const tempImagePath = `${destinationPath}/cover.jpg`; // Ruta temporal para la imagen

    // Descargar la imagen de la URL y guardarla localmente
    await RNFetchBlob.config({ fileCache: true, path: tempImagePath }).fetch('GET', trckImg);

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
      .progress({ count: 10 }, (received, total) => {
        const percentage = Math.floor((received / total) * 100);
        console.log(`Progreso de la descarga: ${percentage}%`);
      });

    if (Platform.OS === 'android') {
      await RNFetchBlob.fs.scanFile([
        { path: destinationFilePath, mime: 'audio/aac' },
      ]);
    }

    // Agregar metadatos y la imagen de portada al archivo AAC utilizando FFmpegKit
    const ffmpegCommand = `-y -i "${destinationFilePath}" -i "${tempImagePath}" -metadata Title="${trackInfo?.name}" -metadata Artist="${trackInfo?.artist.name}" -metadata Album="${trackInfo?.album.name}" -map 0 -map 1 -c copy -disposition:v:0 attached_pic "${tempFilePath}"`;

    const session = await FFmpegKit.execute(ffmpegCommand);

    const returnCode = await session.getReturnCode();

    if (returnCode.isValueSuccess()) {
      // Reemplazar el archivo original con el archivo temporal
      await RNFetchBlob.fs.unlink(destinationFilePath); // Eliminar el archivo original
      await RNFetchBlob.fs.mv(tempFilePath, destinationFilePath); // Renombrar el archivo temporal

      console.log(
        'Archivo AAC descargado y metadatos con imagen agregados en:',
        destinationFilePath,
      );
    } else {
      console.error(
        'Error al agregar metadatos con FFmpeg:',
        await session.getAllLogsAsString(),
      );
    }

    // Limpiar archivo de imagen temporal
    await RNFetchBlob.fs.unlink(tempImagePath);
  } catch (error) {
    console.error('Error al descargar el archivo AAC:', error);
  }
};


export const TrackDownloader = (format: string, trackInfo: SongDetailed, trckImg:string) => {
  if (Platform.OS === 'android') {
    getDownloadPermissionAndroid().then(granted => {
      if (granted) {
        downloadFile(format, trackInfo,trckImg);
      }
    });
  }
};
