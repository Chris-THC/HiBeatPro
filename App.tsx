import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {StatusUpBar} from 'components/StatusBar/StatusUpBar';
import {colorBase} from 'enums/AppColors';
import Navigation from 'navigation/Navigation';
import {SetupPlayer} from 'services/TrackPlayerService/SetupPlayer';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [isConnected, setIsConnected] = useState<any>(true);

  useEffect(() => {
    // SplashScreen.hide();
    // Agrega un listener para detectar cambios en la conexión
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    SetupPlayer();
  }, []);

  return (
    <View style={styles.appContainer}>
      <StatusUpBar backgroundColor={colorBase} />
      {!isConnected && (
        <View style={styles.noInternet}>
          <Text style={styles.textNoInternet}>
            No Internet connection please reconnect..!
          </Text>
        </View>
      )}
      {isConnected && <Navigation />}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colorBase,
  },
  noInternet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colorBase}`,
  },
  textNoInternet: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
