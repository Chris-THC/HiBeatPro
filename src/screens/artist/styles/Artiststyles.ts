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
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 15,
  },
  subTitleText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '700',
    marginLeft: 10,
    marginVertical: 10,
  },
  // Styles linea gradiant
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 490,
  },
});
