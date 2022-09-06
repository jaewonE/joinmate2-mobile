import React, { useState } from 'react';
import styled from 'styled-components/native';
import { GREEN_COLOR, WHITE_COLOR } from '../props/colors';
import { SimpleTabWrapper } from '../components/simpleTabWrapper';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { friendList } from '../props/friendList';

const TopBarAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5; ;
`;

const TextInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: rgba(0, 0, 0, 0.5);
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const SearchBtn = styled.TouchableOpacity`
  background-color: ${(props) => (props.vaildate ? GREEN_COLOR : 'lightgray')};
  margin-top: 10px;
  width: 100%;
  height: 35px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const SearchBtnText = styled.Text`
  font-size: 15px;
  font-weight: ${(props) => (props.vaildate ? 700 : 500)};
  color: ${(props) => (props.vaildate ? WHITE_COLOR : 'black')};
`;

const LoadingWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
  opacity: 0.5;
  padding-left: 20px;
  margin-bottom: 30%;
`;

const AddFriends = ({ navigation: { navigate, goBack } }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValidate, setIsEmailValidate] = useState(false);

  const searchFriend = () => {
    if (!isEmailValidate) {
      Alert.alert('Please enter the right form of email');
      return;
    }
    if (loading) return;
    setLoading(true);
    console.log('addNewFriends: ', email);
    goBack();
    navigate('ModalRouter', {
      screen: 'Profile',
      params: { ...friendList[0] },
    });
    setLoading(false);
  };

  const ValidateEmail = (input) => {
    setEmail(input);
    setIsEmailValidate(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
    );
  };
  return (
    <SimpleTabWrapper
      title="Add Friends by E-mail"
      icons={
        <TouchableOpacity onPress={goBack}>
          <TopBarAddText>Exit</TopBarAddText>
        </TouchableOpacity>
      }
    >
      <TextInput
        placeholder="Friends Email"
        onChangeText={(text) => ValidateEmail(text)}
        onSubmitEditing={searchFriend}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <SearchBtn vaildate={isEmailValidate} onPress={searchFriend}>
        <SearchBtnText vaildate={isEmailValidate}>Search</SearchBtnText>
      </SearchBtn>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator />
          <LoadingText>Searching...</LoadingText>
        </LoadingWrapper>
      )}
    </SimpleTabWrapper>
  );
};

export default AddFriends;
