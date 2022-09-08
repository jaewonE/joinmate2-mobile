import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootRouter from './router/rootRouter';
import OutRouter from './router/outRouter';
import { useColorScheme } from 'react-native';
import { darkMode, lightMode } from './props/theme';
import { ThemeProvider } from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isDark = useColorScheme() === 'dark';

  // useEffect(() => {
  //   async function prepare() {
  //     SplashScreen.preventAutoHideAsync();
  //     auth().onAuthStateChanged((user) => {
  //       console.log(user);
  //       console.log('---------------------');
  //       if (user) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     });
  //     await SplashScreen.hideAsync();
  //   }
  //   prepare();
  // }, []);

  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   });
  // }, []);

  return (
    <ThemeProvider theme={isDark ? darkMode : lightMode}>
      <NavigationContainer>
        {/* {isLoggedIn ? <RootRouter /> : <OutRouter />} */}
        <RootRouter />
      </NavigationContainer>
    </ThemeProvider>
  );
}
