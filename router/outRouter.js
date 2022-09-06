import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import { BLACK_COLOR, WHITE_COLOR } from '../props/colors';
import { useColorScheme } from 'react-native';

const NativeStack = createNativeStackNavigator();

const OutRouter = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? WHITE_COLOR : BLACK_COLOR,
        },
      }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="SignUp" component={SignUp} />
    </NativeStack.Navigator>
  );
};

export default OutRouter;
