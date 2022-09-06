import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/profile';
import AddFriends from '../screens/addFirend';
import SearchFriend from '../screens/searchFriend';
import Chat from '../screens/chat';
import EditProfile from '../screens/editProfile';
import FaceTime from '../screens/faceTime';
import VoiceTime from '../screens/voiceTime';
import GeneralSetting from '../screens/generalSetting';
import CreateChatRoom from '../screens/createChatRoom';

const NativeStack = createNativeStackNavigator();

const ScreensRouter = () => (
  <NativeStack.Navigator screenOptions={{ headerShown: false }}>
    <NativeStack.Screen name="Profile" component={Profile} />
    <NativeStack.Screen name="EditProfile" component={EditProfile} />
    <NativeStack.Screen name="AddFriend" component={AddFriends} />
    <NativeStack.Screen name="SearchFriend" component={SearchFriend} />
    <NativeStack.Screen name="Chat" component={Chat} />
    <NativeStack.Screen name="CreateChatRoom" component={CreateChatRoom} />
    <NativeStack.Screen name="FaceTime" component={FaceTime} />
    <NativeStack.Screen name="VoiceTime" component={VoiceTime} />
    <NativeStack.Screen name="GeneralSetting" component={GeneralSetting} />
  </NativeStack.Navigator>
);

export default ScreensRouter;
