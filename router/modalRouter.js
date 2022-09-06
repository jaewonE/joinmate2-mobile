import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/profile';
import FullImage from '../screens/fullImage';

const NativeStack = createNativeStackNavigator();

const ModalRouter = () => (
  <NativeStack.Navigator
    screenOptions={{ headerShown: false, animation: 'fade' }}
  >
    <NativeStack.Screen name="Profile" component={Profile} />
    <NativeStack.Screen name="FullImage" component={FullImage} />
  </NativeStack.Navigator>
);

export default ModalRouter;
