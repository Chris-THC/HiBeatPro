export const getThumbnailUrl = (thumbnails: any) => {
  if (!thumbnails) return null;

  // Si thumbnails es un string, devolverlo directamente como la URL
  if (typeof thumbnails === 'string') {
    return thumbnails;
  }

  // Si thumbnails es un array, buscar la URL en las miniaturas
  if (Array.isArray(thumbnails)) {
    for (let i = 4; i >= 1; i--) {
      if (thumbnails[i]?.url) {
        return thumbnails[i].url;
      }
    }
  }

  // Si no se encontró ninguna URL válida, devolver null
  return null;
};
