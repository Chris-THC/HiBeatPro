import {StyleSheet} from 'react-native';
import {colorBase} from '../../../enums/AppColors';

export default StyleSheet.create({
  artistMainContainer: {
    backgroundColor: colorBase,
    flex: 1,
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  artistNameContainer: {
    position: 'absolute',
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  artistNameText: {
    fontSize: 35,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    lineHeight: 40,
    color: '#fff',
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  subTitleText: {
    fontSize: 25,
    color: '#fff',
    marginLeft: 10,
    marginVertical: 10,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    lineHeight: 35,
  },
  // Styles linea gradiant
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 350,
  },
});
