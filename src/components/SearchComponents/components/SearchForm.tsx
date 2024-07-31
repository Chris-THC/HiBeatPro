import React from 'react';
import {FontAwesome6, Ionicons} from '@expo/vector-icons';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { searchAlbumsByAxios } from 'hooks/UseAlbumSearch/UseAlbumSearch';
import { serachArtistFuntion, serachTracksFuntion } from 'hooks/UseSearch/UseSearchTracks';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TextInput, View} from 'react-native';
import { RootStackParamList } from 'scrrenTypes/screenStack';
import { useSearchStore } from 'store/searchStore/SearchStore';

type FormData = {
  search: string;
};

export const SearchForm: React.FC = () => {
  const {control, handleSubmit} = useForm<FormData>();
  const {setTrackList, setArtistList, setAlbumsList} = useSearchStore();
  const navigateTo = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onSubmit = async (data: FormData) => {
    try {
      const [tracksInfo, artistInfo, albumSearch] = await Promise.all([
        serachTracksFuntion(data.search),
        serachArtistFuntion(data.search),
        searchAlbumsByAxios(data.search),
      ]);

      setTrackList(tracksInfo);
      setArtistList(artistInfo);
      setAlbumsList(albumSearch);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const GoBackScreen = () => {
    navigateTo.goBack();
  };

  return (
    <View style={styles.container}>
      <RNBounceable style={styles.btnGoBack} onPress={() => GoBackScreen()}>
        <FontAwesome6 name="arrow-left-long" size={24} color="#bbb" />
      </RNBounceable>

      <Controller
        control={control}
        name="search"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            returnKeyType="search"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Search something"
            placeholderTextColor="#888"
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        )}
      />

      <RNBounceable style={styles.btnContent} onPress={handleSubmit(onSubmit)}>
        <Ionicons name="search-sharp" size={28} color="#bbb" />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212121',
    borderRadius: 15,
    paddingHorizontal: 5,
    margin: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Gilroy-Bold',
    marginHorizontal: 5,
  },
  btnContent: {
    height: 45,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGoBack: {
    height: 45,
    width: 40,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
