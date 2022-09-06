import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreensRouter from './screensRouter';
import TabRouter from './tabRouter';
import ModalRouter from './modalRouter';

const NativeStack = createNativeStackNavigator();

const RootRouter = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="TabRouter" component={TabRouter} />
      <NativeStack.Screen name="ScreensRouter" component={ScreensRouter} />
      <NativeStack.Group
        screenOptions={{
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
        }}
      >
        <NativeStack.Screen name="ModalRouter" component={ModalRouter} />
      </NativeStack.Group>
    </NativeStack.Navigator>
  );
};

export default RootRouter;
