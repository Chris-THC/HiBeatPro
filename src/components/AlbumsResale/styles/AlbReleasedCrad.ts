import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageAlbumCard: {
    height: '95%', // Ajusta esto según el diseño deseado
    width: '95%',
    borderRadius: 8,
    position: 'absolute',
  },
  textArtistName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'black',
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 1)', // Color de la sombra
    textShadowOffset: {width: -1, height: 1}, // Desplazamiento de la sombra
    textShadowRadius: 2, // Radio de desenfoque de la sombra
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    borderRadius: 1, // Radio de la sombra
  },
  contentCard: {
    marginVertical: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 145,
    flexBasis: '30%',
  },
});
