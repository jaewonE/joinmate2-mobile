import React, { useState } from 'react';
import styled from 'styled-components/native';
import { GREEN_COLOR, WHITE_COLOR } from '../props/colors';
import { SimpleTabWrapper } from '../components/simpleTabWrapper';
import { Alert, TouchableOpacity } from 'react-native';
import { friendList } from '../props/friendList';
import FadeInOut from 'react-native-fade-in-out';
import CreateChatRoomItem from '../components/createChatRoomItem';

const TopBarAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;
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
  background-color: ${(props) => (props.hasName ? GREEN_COLOR : 'lightgray')};
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
`;

const ResultWrapper = styled.View`
  width: 100%;
  background-color: white;
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
`;

const ResultCount = styled.Text`
  font-size: 17px;
  font-weight: 500;
  opacity: 0.4;
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
  background-color: ${GREEN_COLOR};
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
          <ResultWrapper>
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
                  onClickMember={onClickMember}
                  toogleMemberCallback={toogleMemberCallback}
                />
              )}
            />
          </ResultWrapper>
          <SubmitWrapper onPress={createChatRoom}>
            <SubmitBtn>
              <SubmitText>Create Chatroom</SubmitText>
            </SubmitBtn>
          </SubmitWrapper>
        </FadeInOut>
      ) : (
        <FadeInOut visible={visible} duration={400}>
          <TextInput
            placeholder="Enter chatroom name"
            onChangeText={(text) => setChatRoomName(text)}
            onSubmitEditing={() => setHasSetName(Boolean(chatRoomName))}
          />
          <SearchBtn hasName={Boolean(chatRoomName)} onPress={goNext}>
            <SearchBtnText hasName={goNext}>Next</SearchBtnText>
          </SearchBtn>
        </FadeInOut>
      )}
    </SimpleTabWrapper>
  );
};

export default CreateChatRoom;
