import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {getDownloadPermissionAndroid} from './PermissionAndroid';

const downloadFile = async (videoId: string) => {
  try {
    console.log(`Desde la descarga: ${videoId}`);

    // Obtener la ruta de la carpeta de descargas
    const destinationPath = RNFetchBlob.fs.dirs.DownloadDir;

    // Ruta completa del archivo
    const destinationFilePath = `${destinationPath}/testAudio.mp3`;

    // Elige el formato de audio con la mejor calidad
    const format: string =
      'https://rr1---sn-0opoxu-w5ae.googlevideo.com/videoplayback?expire=1723367843&ei=Qy24ZqruM4_xir4Pw9nxiQM&ip=2806%3A10a6%3A6%3A7cf7%3A78f5%3Ae1b5%3Af4a2%3A758f&id=o-ANe_z_GBd9GNFO3q406d0ooHffgkZI0NuF2LxVAGbVSR&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Zb&mm=31%2C29&mn=sn-0opoxu-w5ae%2Csn-a5meknd6&ms=au%2Crdu&mv=m&mvi=1&pl=48&gcr=mx&initcwndbps=666250&vprv=1&svpuc=1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=3088936&dur=190.760&lmt=1719537305812616&mt=1723345989&fvip=2&keepalive=yes&c=IOS_MUSIC&txp=2318224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAIlZAonYCIvGrva-Jhs2AO0Gw5re_ENdrS2cnUBzNpxyAiAOz-hZQwmV0lPS5GhTKl4i7yKeDP1CJXu4ESw9ecaSmA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AGtxev0wRQIhAIW7RqmFzrqru9bpe-I_SN4NtZYT8A3LbbTzL7VVN9EtAiAh1PDkqp6F-hCJFqR8mB_JRnTQwrT626g_PvW3kpMk7A%3D%3D';

    // Configura RNFetchBlob para guardar el archivo en la carpeta de descargas
    const config = RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: 'audio/mpeg', // Tipo MIME para archivos MP3
        notification: true, // Muestra una notificación cuando la descarga se complete
        path: destinationFilePath, // Ruta donde se guardará el archivo en la carpeta de descargas
        description: 'Descargando archivo MP3...',
        mediaScannable: true, // Hace que el archivo sea visible en la galería y otros exploradores de archivos
      },
    });

    // Descarga el archivo MP3 utilizando RNFetchBlob
    const resp = await config.fetch('GET', format);

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
  } else {
    // downloadFile(fileUrl).then(res => {
    //   RNFetchBlob.ios.previewDocument(res.path());
    // });
    console.log('Algo salio mal');
  }
};
