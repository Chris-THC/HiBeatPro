import {getColors} from 'react-native-image-colors'; // Asegúrate de importar Platform desde react-native-image-colors
import {AndroidColors} from '../../interfaces/colorsInterface/Colors';

export const ImageColorPalette = async (urlImage: string): Promise<AndroidColors | null> => {
  try {
    const colors = await getColors(urlImage, {
      fallback: '#228B22',
      cache: true,
      key: urlImage,
    });

    // Verificar la plataforma y los colores de Android
    if (colors.platform === 'android') {
      const androidColors: AndroidColors = {
        average: colors.average,
        darkMuted: colors.darkMuted,
        darkVibrant: colors.darkVibrant,
        dominant: colors.dominant,
        lightMuted: colors.lightMuted,
        lightVibrant: colors.lightVibrant,
        muted: colors.muted,
        platform: colors.platform,
        vibrant: colors.vibrant,
      };

      return androidColors;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching colors:', error);
    return null;
  }
};
