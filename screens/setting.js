import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import TabWrapper from '../components/tabWrapper';
import SettingItem from '../components/settingItem';
import { RED_COLOR } from '../props/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Alert, useColorScheme } from 'react-native';
import { FIREBASE_GOOGLE_CLIENT_ID } from '@env';

const ScrollWrapper = styled.ScrollView`
  width: 100%;
  flex: 1;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const LogoutBtn = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: ${RED_COLOR};
  margin-bottom: 95px;
  margin-top: 10px;
  align-self: center;
`;
const LogoutText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

const Setting = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === 'dark';
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_GOOGLE_CLIENT_ID,
      // offlineAccess: true,
    });
  }, []);

  const onPressLogout = () => {
    Alert.alert('Confirm', 'Are you sure you want to Logout?', [
      { text: 'OK', onPress: async () => await logout() },
      {
        text: 'Cancel',
        style: 'destructive',
      },
    ]);
  };
  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      // firebase로 로그인을 처리했기 때문에 GoogleSignin가 유저의 정보를 가지고 있지 않다.
      // GoogleSignin.isSignedIn() 또는 .getCurrentUser()를 했을 때 정보가 없음을 확인 할 수 있다.
      // await GoogleSignin.revokeAccess();
      auth().signOut(); // .then(() => alert('Your are signed out!'));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TabWrapper title="Setting">
      <ScrollWrapper>
        <SettingItem
          isDark={isDark}
          title="General"
          icon="ios-settings-outline"
          onPress={() =>
            navigate('ScreensRouter', {
              screen: 'GeneralSetting',
            })
          }
        />
        <SettingItem
          isDark={isDark}
          title="Profile"
          icon="person-outline"
          onPress={() =>
            navigate('ScreensRouter', {
              screen: 'EditProfile',
            })
          }
        />
      </ScrollWrapper>
      <LogoutBtn onPress={onPressLogout}>
        <LogoutText>Log out</LogoutText>
      </LogoutBtn>
    </TabWrapper>
  );
};

export default Setting;
