import TrackPlayer, {State} from 'react-native-track-player';

// Función para alternar la reproducción
export const togglePlayback = async () => {
  const state = await TrackPlayer.getState();
  if (state === State.Playing) {
    await TrackPlayer.pause();
  } else {
    await TrackPlayer.play();
  }
};

// Función para manejar la pista anterior
export const handlerPreviousTrack = async () => {
  const progress = await TrackPlayer.getProgress();
  const state = await TrackPlayer.getState();

  if (progress.position > 10) {
    // Reiniciar la canción si se han reproducido más de 10 segundos
    await TrackPlayer.seekTo(0);
  } else {
    // Saltar a la pista anterior si se han reproducido menos de 10 segundos
    await TrackPlayer.skipToPrevious();
  }

  // Si el reproductor no está reproduciendo, iniciar la reproducción
  if (state !== State.Playing) {
    await TrackPlayer.play();
  }
};

// Función para manejar la siguiente pista
export const handlerNextTrack = async () => {
  const state = await TrackPlayer.getState();

  // Saltar a la siguiente pista
  await TrackPlayer.skipToNext();

  // Si el reproductor no está reproduciendo, iniciar la reproducción
  if (state !== State.Playing) {
    await TrackPlayer.play();
  }
};

export const handlerPlay = async () => {
  await TrackPlayer.play();
};
