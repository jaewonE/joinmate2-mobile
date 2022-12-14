//tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { ALL_BLACK_COLOR, WHITE_COLOR } from '../props/colors';
import Friends from '../screens/friends';
import ChatList from '../screens/chatlist';
import Setting from '../screens/setting';

const Tab = createBottomTabNavigator();

const TabRouter = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? ALL_BLACK_COLOR : WHITE_COLOR,
      }}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? ALL_BLACK_COLOR : WHITE_COLOR,
        },
        tabBarActiveTintColor: isDark ? WHITE_COLOR : ALL_BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? WHITE_COLOR : ALL_BLACK_COLOR,
      }}
    >
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={29}
              color={isDark ? WHITE_COLOR : ALL_BLACK_COLOR}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-outline'}
              size={29}
              color={isDark ? WHITE_COLOR : ALL_BLACK_COLOR}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'ios-settings' : 'ios-settings-outline'}
              size={29}
              color={isDark ? WHITE_COLOR : ALL_BLACK_COLOR}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
