import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';
import { WHITE_COLOR, BLACK_COLOR, GREEN_COLOR } from '../props/colors';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { FIREBASE_GOOGLE_CLIENT_ID } from '@env';

export const Container = styled.View`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  background-color: ${(props) => props.theme.generalBgColor};
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
`;
export const Title = styled.Text`
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${(props) => props.theme.generalTextColor};
`;
export const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  opacity: 0.6;
  margin-bottom: 50px;
  padding-left: 2px;
  color: ${(props) => props.theme.generalTextColor};
`;
export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0,0,0,0.3)'};
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
  padding-left: 5px;
  color: ${(props) => props.theme.generalTextColor};
`;
export const InputGap = styled.View`
  height: 20px;
`;

export const SubmitBtn = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props) =>
    props.bgBlack ? props.theme.generalTextColor : WHITE_COLOR};
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  border-width: 2px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubmitBtnText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) =>
    props.bgBlack ? props.theme.generalBgColor : BLACK_COLOR};
`;

export const GoogleLogo = styled.Image`
  width: 23px;
  height: 23px;
  margin-right: 10px;
`;

export const RecommendWrapper = styled.View`
  width: 100%;
  height: 25px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RecommendText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.generalTextColor};
  margin-right: 5px;
`;

export const LinkText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${GREEN_COLOR};
`;

const Login = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const isDark = useColorScheme() === 'dark';

  const login = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Fill in the form.');
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email');
      } else if (error.code === 'auth/user-disabled') {
        Alert.alert('Disabled', 'Blocked by admin');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Email not found');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password');
      } else {
        console.error(error);
        Alert.alert('Something wrong...');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_GOOGLE_CLIENT_ID,
      // offlineAccess: true,
    });
  }, []);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } = await auth().signInWithCredential(googleCredential);
      // console.log(user);
    } catch (error) {
      if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Processing...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services is not available');
      } else {
        console.error(error);
      }
      // error.code === statusCodes.SIGN_IN_CANCELLED: 유저가 취소한 경우에는 무시함
      // error.code === statusCodes.SIGN_IN_REQUIRED
      // Useful for use with signInSilently() - no user has signed in yet
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <SubTitle>Welcome back!</SubTitle>
      <Input
        isDark={isDark}
        placeholder="Email"
        placeholderTextColor={
          isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
        }
        onChangeText={(text) => setEmail(text)}
        value={email}
        onSubmitEditing={() => passwordInput.current.focus()}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Input
        isDark={isDark}
        ref={passwordInput}
        placeholder="Password"
        placeholderTextColor={
          isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
        }
        onChangeText={(text) => setPassword(text)}
        value={password}
        onSubmitEditing={login}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <InputGap />
      <SubmitBtn bgBlack={true} onPress={login}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <SubmitBtnText bgBlack={true}>Login</SubmitBtnText>
        )}
      </SubmitBtn>
      <SubmitBtn onPress={loginWithGoogle}>
        <GoogleLogo
          source={require('../images/googleLogo.png')}
          resizeMode="contain"
        />
        <SubmitBtnText>Login with Google</SubmitBtnText>
      </SubmitBtn>
      <RecommendWrapper>
        <RecommendText>Don't Have an account yet?</RecommendText>
        <TouchableOpacity onPress={() => navigate('SignUp')}>
          <LinkText>Create account</LinkText>
        </TouchableOpacity>
      </RecommendWrapper>
    </Container>
  );
};

export default Login;
