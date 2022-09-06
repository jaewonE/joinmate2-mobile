import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Input, InputGap, SubmitBtn, SubmitBtnText } from './login';
import TabWrapper from '../components/tabWrapper';
import styled from 'styled-components/native';
import { BLUE_COLOR, GREEN_COLOR, RED_COLOR } from '../props/colors';

const TopBarAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;
`;

const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0,0,0,0.3)'};
  border-radius: 10px;
  margin-bottom: 25px;
`;
const ImageWrapper = styled.View`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  margin-top: 3%;
  width: 65px;
  height: 65px;
  border-radius: 25px;
`;
const ImageBtnWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;
const ImageBtn = styled.TouchableOpacity`
  height: 40%;
  width: 80%;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0,0,0,0.3)'};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.deleteBtn ? RED_COLOR : 'transparent')};
`;
const ImageBtnText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.deleteBtn ? 'white' : 'black')};
`;

const EditProfile = ({ navigation: { goBack } }) => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const updateProfile = () => {
    console.log('Update!');
  };

  return (
    <TabWrapper
      title="Edit Profile"
      icons={
        <TouchableOpacity onPress={goBack}>
          <TopBarAddText>Exit</TopBarAddText>
        </TouchableOpacity>
      }
    >
      <Container>
        <ImageContainer>
          <ImageWrapper>
            <Image source={require('../images/user_profile.jpeg')} />
          </ImageWrapper>
          <ImageBtnWrapper>
            <ImageBtn>
              <ImageBtnText>Change profile image</ImageBtnText>
            </ImageBtn>
            <ImageBtn deleteBtn={true}>
              <ImageBtnText deleteBtn={true}>Delete</ImageBtnText>
            </ImageBtn>
          </ImageBtnWrapper>
        </ImageContainer>
        <ImageContainer>
          <ImageWrapper>
            <Image source={require('../images/profile_background.jpeg')} />
          </ImageWrapper>
          <ImageBtnWrapper>
            <ImageBtn>
              <ImageBtnText>Change background image</ImageBtnText>
            </ImageBtn>
            <ImageBtn deleteBtn={true}>
              <ImageBtnText deleteBtn={true}>Delete</ImageBtnText>
            </ImageBtn>
          </ImageBtnWrapper>
        </ImageContainer>
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
          onSubmitEditing={updateProfile}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />
        <InputGap />
        <SubmitBtn bgBlack={true} onPress={updateProfile}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <SubmitBtnText bgBlack={true}>Update</SubmitBtnText>
          )}
        </SubmitBtn>
      </Container>
    </TabWrapper>
  );
};

export default EditProfile;
