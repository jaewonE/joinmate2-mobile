import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  SubTitle,
  Input,
  InputGap,
  SubmitBtn,
  SubmitBtnText,
  GoogleLogo,
  RecommendWrapper,
  RecommendText,
  LinkText,
} from './login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { FIREBASE_GOOGLE_CLIENT_ID } from '@env';

const SignUp = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_GOOGLE_CLIENT_ID,
      // offlineAccess: true,
    });
  }, []);

  const signUpWithGoogle = async () => {
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

  const signUp = async () => {
    if (email === '' || password === '' || name === '') {
      return Alert.alert('Fill in the form.');
    }
    if (loading) {
      return;
    }
    if (email.includes('@gmail.com')) {
      return Alert.alert('Please use Google social login for gmail');
    }
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Email already exist!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email');
      } else if (error.code === 'auth/operation-not-allowed') {
        Alert.alert('Error', 'Operation not allowed. sorry');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Write a stronger password!');
      } else {
        Alert.alert('Something wrong...');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create an account</Title>
      <SubTitle>Let's get started with 100 free bitcoin</SubTitle>
      <Input
        isDark={isDark}
        placeholder="Name"
        placeholderTextColor={
          isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
        }
        onChangeText={(text) => setName(text)}
        value={name}
        onSubmitEditing={() => emailInput.current.focus()}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        isDark={isDark}
        ref={emailInput}
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
        onSubmitEditing={signUp}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
      />
      <InputGap />
      <SubmitBtn bgBlack={true} onPress={signUp}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <SubmitBtnText bgBlack={true}>Create account</SubmitBtnText>
        )}
      </SubmitBtn>
      <SubmitBtn onPress={signUpWithGoogle}>
        <GoogleLogo
          source={require('../images/googleLogo.png')}
          resizeMode="contain"
        />
        <SubmitBtnText>Sign up with Google</SubmitBtnText>
      </SubmitBtn>
      <RecommendWrapper>
        <RecommendText>Already Have an account?</RecommendText>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <LinkText>Log in</LinkText>
        </TouchableOpacity>
      </RecommendWrapper>
    </Container>
  );
};

export default SignUp;
