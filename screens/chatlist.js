import React from 'react';
import styled from 'styled-components/native';
import TabWrapper from '../components/tabWrapper';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { chatRoomList } from '../props/chatRoomList';
import FriendProfile from '../components/friendProfile';
import { TouchableOpacity } from 'react-native';
import ChatRoom from '../components/chatRoom';

const TopIconsWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-right: 7px;
`;

const TopIconBox = styled.TouchableOpacity`
  margin-left: 20px;
`;

const FlatListWrapper = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  padding-bottom: 85px;
`;

const FlatList = styled.FlatList`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const FlatGap = styled.View`
  height: 5px;
`;

const ChatList = ({ navigation }) => {
  const searchChat = () => {
    navigation.navigate('ScreensRouter', {
      screen: 'SearchFriend',
    });
  };
  const newChat = () => {
    navigation.navigate('ScreensRouter', {
      screen: 'CreateChatRoom',
    });
  };
  const onClickChatroom = (chatRoom) => {
    navigation.navigate('ScreensRouter', {
      screen: 'Chat',
      params: { ...chatRoom },
    });
  };

  return (
    <TabWrapper
      title="Chats"
      icons={
        <TopIconsWrapper>
          <TopIconBox onPress={searchChat}>
            <Ionicons
              style={{ opacity: 0.5 }}
              name="ios-search-outline"
              size={25}
              color="black"
            />
          </TopIconBox>
          <TopIconBox onPress={newChat}>
            <MaterialCommunityIcons
              style={{ opacity: 0.4 }}
              name="chat-plus-outline"
              size={26}
              color="black"
            />
          </TopIconBox>
        </TopIconsWrapper>
      }
    >
      <FlatListWrapper>
        <FlatList
          data={chatRoomList}
          keyExtractor={(chatRoom) => chatRoom.id + ''}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatGap}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onClickChatroom(item)}>
              <ChatRoom chatRoom={item} />
            </TouchableOpacity>
          )}
        />
      </FlatListWrapper>
    </TabWrapper>
  );
};

export default ChatList;
