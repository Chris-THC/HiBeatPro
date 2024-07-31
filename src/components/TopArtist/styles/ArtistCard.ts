import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  fullContainer: {
    marginRight: 100,
    marginLeft: 6,
    height: 'auto',
  },
  topArtistContent: {
    flexDirection: 'column',
  },
  imageArtistCard: {
    height: 90,
    width: 90,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 2,
    color: '#fff',
    marginTop: 8,
    flexShrink: 1,
    textShadowColor: 'rgba(1, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 1},
    textShadowRadius: 2,
  },
  artistContentInfo: {
    flexDirection: 'row',
    width: 85,
    justifyContent: 'space-between',
    margin: 3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  artistContentInfoContText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
