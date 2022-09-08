import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, useColorScheme } from 'react-native';
import ProfileImg from '../components/profileImg';
import FriendProfile from '../components/friendProfile';
import { friendList } from '../props/friendList';
import {
  THICK_WHITE_COLOR,
  BLACK_COLOR,
  WHITE_COLOR,
  ALL_BLACK_COLOR,
} from '../props/colors';

const Container = styled.SafeAreaView`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  background-color: ${(props) =>
    props.isDark ? ALL_BLACK_COLOR : THICK_WHITE_COLOR};
`;

const ContainerView = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  flex: 1;
`;

const TextInputWrapper = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SearchIconWrapper = styled.View`
  position: absolute;
  top: 14px;
  left: 13px;
  z-index: 10;
  opacity: 0.7;
`;

const TextInput = styled.TextInput`
  height: 100%;
  width: 100%;
  flex: 1;
  padding-left: 42px;
  padding-right: 20px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.isDark ? BLACK_COLOR : 'rgb(235, 235, 235)'};
  color: ${(props) => props.theme.generalTextColor};
`;

const GoBack = styled.Text`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.generalTextColor};
`;

const ResultWrapper = styled.View`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : WHITE_COLOR)};
`;

const FriendsResultWrapper = styled(ResultWrapper)`
  height: 145px;
  min-height: 140px;
`;

const ChatRoomResultWrapper = styled(ResultWrapper)`
  flex: 1;
`;

const ResultTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  padding-left: 5px;
  color: ${(props) => props.theme.generalTextColor};
`;

const FriendsList = styled.FlatList`
  height: 90px;
`;

const FriendProfileWrapper = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const FriendProfileName = styled.Text`
  font-size: 14px;
  margin-top: 3px;
  padding-left: 2px;
  color: ${(props) => props.theme.generalTextColor};
`;

const WGap = styled.View`
  width: 10px;
`;

const ChatList = styled.FlatList`
  align-self: stretch;
  /* height: 60%; */
`;

const FlatGap = styled.View`
  height: 5px;
`;

const ResultNotFoundWrapper = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ResultNotFoundText = styled.Text`
  font-size: 17px;
  font-weight: 600;
  opacity: 0.3;
  color: ${(props) => props.theme.generalTextColor};
`;

const SearchFriend = ({ navigation: { navigate, goBack } }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendResult, setFriendResult] = useState(friendList);
  const [chatResult, setChatResult] = useState(friendList);
  const isDark = useColorScheme() === 'dark';

  const onNewTextInput = (text) => {
    setSearchTerm(text);
    search(text);
  };
  const search = (text) => {
    const searchword = text ? text : searchTerm;
    console.log(searchword);
  };

  const openProfile = (profile) => {
    console.log(profile);
    navigate('ModalRouter', {
      screen: 'Profile',
      params: { ...profile },
    });
  };

  const openChatRoom = (chatRoom) => {
    navigate('ScreensRouter', {
      screen: 'Chat',
      params: { ...chatRoom },
    });
  };

  return (
    <Container isDark={isDark}>
      <ContainerView>
        <TextInputWrapper>
          <SearchIconWrapper>
            <Ionicons
              name="ios-search"
              size={20}
              color={isDark ? 'white' : 'black'}
            />
          </SearchIconWrapper>
          <TextInput
            isDark={isDark}
            onChangeText={(text) => onNewTextInput(text)}
            returnKeyType="search"
            onSubmitEditing={() => search()}
            placeholder="Enter friend or chat name to search"
          />
          <TouchableOpacity onPress={goBack}>
            <GoBack>Exit</GoBack>
          </TouchableOpacity>
        </TextInputWrapper>
        {friendResult.length > 0 && (
          <FriendsResultWrapper isDark={isDark}>
            <ResultTitle>Friends</ResultTitle>
            <FriendsList
              data={friendResult}
              horizontal
              keyExtractor={(item) => item.id + ''}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={WGap}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ zIndex: 10 }}
                  onPress={() => openProfile(item)}
                >
                  <FriendProfileWrapper>
                    <ProfileImg coverImg={item.coverImg} />
                    <FriendProfileName>
                      {item.name.length > 8
                        ? `${item.name.slice(0, 8)}...`
                        : item.name}
                    </FriendProfileName>
                  </FriendProfileWrapper>
                </TouchableOpacity>
              )}
            />
          </FriendsResultWrapper>
        )}
        {chatResult.length > 0 && (
          <ChatRoomResultWrapper isDark={isDark}>
            <ResultTitle>ChatRoom</ResultTitle>
            <ChatList
              data={chatResult}
              keyExtractor={(chat) => chat.id + ''}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={FlatGap}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openChatRoom(item)}>
                  <FriendProfile friend={item} />
                </TouchableOpacity>
              )}
            />
          </ChatRoomResultWrapper>
        )}
        {friendResult.length < 1 && chatResult.length < 1 && (
          <ResultNotFoundWrapper>
            <ResultNotFoundText>
              {searchTerm
                ? 'Result not found'
                : 'Enter friend or chat name to search'}
            </ResultNotFoundText>
          </ResultNotFoundWrapper>
        )}
      </ContainerView>
    </Container>
  );
};

export default SearchFriend;
