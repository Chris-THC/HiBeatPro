import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Home } from 'screens/home/Home';
import {StackScreensTy} from 'scrrenTypes/ScreenTypes';
// import {Album} from '../screens/album/Album';
// import {AlbumsList} from '../screens/albumsList/AlbumsList';
// import {Artist} from '../screens/artist/Artist';
// import {Home} from '../screens/home/Home';
// import {Player} from '../screens/player/Player';
// import {Playlist} from '../screens/playlist/Playlist';
// import {RandomPlayListStack} from '../screens/randomPlaylist/RandomPlaylistStack';
// import {Search} from '../screens/search/Search';
// import {StackPlayer} from '../screens/stack/StackPlayer';
// import {RootStackParamList} from '../types/screenStack';
// import {AlbumRealce} from '../screens/AlbumRealce/AlbumRealce';

const Stack = createStackNavigator<StackScreensTy>();

const NavigationStack = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="Home" component={Home} />
          {/* <Stack.Screen name="Album" component={Album} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="RandomPlaylist" component={RandomPlayListStack} />
          <Stack.Screen name="ArtistScren" component={Artist} />
          <Stack.Screen
            name="Player"
            component={Player}
            options={{
              gestureEnabled: true,
              gestureDirection: 'vertical',
              cardStyleInterpolator: ({current, layouts}) => ({
                cardStyle: {
                  transform: [
                    {
                      translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
              }),
            }}
          />
          <Stack.Screen
            name="StackPlayer"
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
            }}
            component={StackPlayer}
          />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="AlbumsList" component={AlbumsList} />
          <Stack.Screen name="AlbumRealce" component={AlbumRealce} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default NavigationStack;
