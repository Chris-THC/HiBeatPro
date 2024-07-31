import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AlbumSearch} from 'components/SearchComponents/views/AlbumSearch';
import {ArtistSearch} from 'components/SearchComponents/views/ArtistSearch';
import {TrackSearch} from 'components/SearchComponents/views/TrackSearch';
import {colorBase} from 'enums/AppColors';

const Tab = createMaterialTopTabNavigator();

export const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, color: '#fff'},
        tabBarStyle: {backgroundColor: colorBase},
      }}>
      <Tab.Screen name="Tracks" component={TrackSearch} />
      <Tab.Screen name="Artists" component={ArtistSearch} />
      <Tab.Screen name="Albums" component={AlbumSearch} />
    </Tab.Navigator>
  );
};
