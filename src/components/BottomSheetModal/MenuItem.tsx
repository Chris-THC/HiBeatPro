import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {colorBase, secondColor} from 'enums/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker';
import {useBottomSheetStore} from 'store/modalStore/useBottomSheetStore';
import {useModalTrack} from 'store/sheetModalTrack/ModalTrack';
import {getThumbnailUrl} from 'utils/selectImage/SelectImage';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  style?: object;
  onPress?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({icon, label, style, onPress}) => (
  <RNBounceable style={[styles.menuItem, style]} onPress={onPress}>
    {icon}
    <Text style={styles.menuItemText}>{label}</Text>
  </RNBounceable>
);

export const MenuComponent: React.FC = () => {
  const {bottomSheetModalRef} = useBottomSheetStore();
  const {trackInfo} = useModalTrack();
  const imageUrl = getThumbnailUrl(trackInfo?.thumbnails);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View>
          <FastImage
            style={styles.imageStyle}
            source={{
              uri: imageUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={{marginLeft: 15, width: '76%'}}>
          <TextTicker
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
            duration={15000}
            loop
            bounce={true}
            repeatSpacer={20}
            marqueeDelay={50}>
            {trackInfo?.name}
          </TextTicker>
          <TextTicker
            style={{color: '#ccc', fontSize: 15}}
            duration={15000}
            loop
            bounce={true}
            repeatSpacer={20}
            marqueeDelay={50}>
            {trackInfo?.artist.name}
          </TextTicker>
        </View>
      </View>
      <MenuItem
        icon={<MaterialIcons name="download" size={26} color="#fff" />}
        label="Download Track"
        onPress={() => {
          console.log(trackInfo?.videoId);
        }}
      />
      <MenuItem
        icon={<FontAwesome5 name="user-tag" size={24} color="#fff" />}
        label="Go to Artist"
      />
      <MenuItem
        icon={<MaterialIcons name="album" size={26} color="#fff" />}
        label="Go to Album"
      />
      <MenuItem
        icon={<MaterialIcons name="audiotrack" size={26} color="#fff" />}
        label="Simiar Tracks"
      />

      <MenuItem
        icon={<MaterialIcons name="cancel" size={26} color="red" />}
        label="Close"
        style={styles.reportItem}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: secondColor,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: colorBase,
    padding: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.75,
    borderBottomColor: '#333c',
    marginVertical: 1,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 17,
    color: '#fff',
  },
  reportItem: {
    paddingVertical: 15,
  },
  imageStyle: {
    height: 70,
    width: 70,
    borderRadius: 5,
  },
});
