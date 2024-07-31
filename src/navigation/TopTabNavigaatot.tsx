import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AlbumSearch} from '../components/SearchComponents/views/AlbumSearch';
import {ArtistSearch} from '../components/SearchComponents/views/ArtistSearch';
import {colorBase} from '../enums/AppColors';
import {TrackSearch} from '../components/SearchComponents/views/TrackSearch';

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
