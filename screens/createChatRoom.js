import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  ALL_BLACK_COLOR,
  BLACK_COLOR,
  GREEN_COLOR,
  THICK_WHITE_COLOR,
  WHITE_COLOR,
} from '../props/colors';
import { SimpleTabWrapper } from '../components/simpleTabWrapper';
import { Alert, TouchableOpacity, useColorScheme } from 'react-native';
import { friendList } from '../props/friendList';
import FadeInOut from 'react-native-fade-in-out';
import CreateChatRoomItem from '../components/createChatRoomItem';

const TopBarAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;
  color: ${(props) => props.theme.generalTextColor};
`;

const TextInput = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.generalTextColor};
`;

const SearchBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.hasName
      ? GREEN_COLOR
      : props.isDark
      ? 'rgba(255, 255, 255, 0.5)'
      : 'lightgray'};
  margin-top: 10px;
  width: 100%;
  height: 35px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const SearchBtnText = styled.Text`
  font-size: 15px;
  font-weight: ${(props) => (props.hasName ? 700 : 500)};
  color: ${(props) => (props.hasName ? WHITE_COLOR : 'black')};
`;

const RoomTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  padding-left: 0px;
  padding-bottom: 20px;
  color: ${(props) => props.theme.generalTextColor};
`;

const ResultWrapper = styled.View`
  width: 100%;
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-radius: 12px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  flex: 80;
`;

const ResultTitleWrapper = styled.View`
  height: 20px;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 20px;
  padding-right: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ResultTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.generalTextColor};
`;

const ResultCount = styled.Text`
  font-size: 17px;
  font-weight: 500;
  opacity: 0.4;
  color: ${(props) => props.theme.generalTextColor};
`;

const ChatList = styled.FlatList`
  align-self: stretch;
  /* height: 60%; */
`;

const FlatGap = styled.View`
  height: 5px;
`;

const SubmitWrapper = styled.TouchableOpacity`
  width: 100%;
  min-height: 55px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;
const SubmitBtn = styled.View`
  width: 100%;
  height: 40px;
  background-color: ${(props) =>
    props.hasMembers
      ? GREEN_COLOR
      : props.isDark
      ? 'rgba(255, 255, 255, 0.5)'
      : 'lightgray'};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: white;
`;

const CreateChatRoom = ({ navigation: { goBack, navigate } }) => {
  const [chatRoomName, setChatRoomName] = useState('');
  const [hasSetName, setHasSetName] = useState(false);
  const [visible, setVisible] = useState(true);
  const [members, setMembers] = useState([]);
  const isDark = useColorScheme() === 'dark';

  const toogleMemberCallback = (member, isChecked) => {
    if (isChecked)
      setMembers((prev) =>
        prev.filter((InMember) => InMember.id !== member.id)
      );
    else setMembers([...members, member]);
  };

  const createChatRoom = () => {
    if (members.length < 1) {
      Alert.alert('Choose members of chatroom', [{ text: 'OK' }]);
      return;
    }
    Alert.alert('Message', 'Successfully create chatroom', [
      {
        text: 'OK',
        onPress: () => goBack(),
      },
    ]);
  };

  const onClickMember = (friend) => {
    navigate('ModalRouter', {
      screen: 'Profile',
      params: { ...friend },
    });
  };

  const goNext = () => {
    if (Boolean(chatRoomName)) {
      setVisible(false);
      setTimeout(() => setHasSetName(true), 400);
    }
  };

  return (
    <SimpleTabWrapper
      bgColor={isDark ? ALL_BLACK_COLOR : THICK_WHITE_COLOR}
      title="Add new chatroom"
      icons={
        <TouchableOpacity onPress={goBack}>
          <TopBarAddText>Exit</TopBarAddText>
        </TouchableOpacity>
      }
    >
      {hasSetName ? (
        <FadeInOut style={{ flex: 1 }} visible={!visible} duration={400}>
          <RoomTitle>Room: {chatRoomName}</RoomTitle>
          <ResultWrapper isDark={isDark}>
            <ResultTitleWrapper>
              <ResultTitle>Add Members</ResultTitle>
              <ResultCount>{members.length}</ResultCount>
            </ResultTitleWrapper>
            <ChatList
              data={friendList}
              keyExtractor={(member) => member.id + ''}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatGap}
              renderItem={({ item }) => (
                <CreateChatRoomItem
                  item={item}
                  isDark={isDark}
                  onClickMember={onClickMember}
                  toogleMemberCallback={toogleMemberCallback}
                />
              )}
            />
          </ResultWrapper>
          <SubmitWrapper onPress={createChatRoom}>
            <SubmitBtn isDark={isDark} hasMembers={members.length > 0}>
              <SubmitText>Create Chatroom</SubmitText>
            </SubmitBtn>
          </SubmitWrapper>
        </FadeInOut>
      ) : (
        <FadeInOut visible={visible} duration={400}>
          <TextInput
            isDark={isDark}
            placeholder="Enter chatroom name"
            onChangeText={(text) => setChatRoomName(text)}
            onSubmitEditing={goNext}
          />
          <SearchBtn
            isDark={isDark}
            hasName={Boolean(chatRoomName)}
            onPress={goNext}
          >
            <SearchBtnText hasName={goNext}>Next</SearchBtnText>
          </SearchBtn>
        </FadeInOut>
      )}
    </SimpleTabWrapper>
  );
};

export default CreateChatRoom;
