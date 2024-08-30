import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  playlistCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: 235,
    width: 200,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  imageCrad: {
    marginTop: 5,
    height: 185,
    width: 185,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleCrad: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 3,
    fontFamily: 'Poppins-Bold',
    lineHeight: 35,
  },
  playIconOnImage: {
    zIndex: 1,
    position: 'absolute',
    bottom: 45,
    left: '5%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 55,
    width: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
