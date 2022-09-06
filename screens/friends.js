import React from 'react';
import styled from 'styled-components/native';
import TabWrapper from '../components/tabWrapper';
import { Ionicons } from '@expo/vector-icons';
import FriendProfile from '../components/friendProfile';
import { TouchableOpacity } from 'react-native';
import { friendList } from '../props/friendList';

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const NonFlatList = styled.View`
  height: 155px;
  width: 100%;
`;

const TopIconsWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-right: 7px;
`;

const TopIconBox = styled.TouchableOpacity`
  margin-left: 20px;
`;

const FriendsTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  opacity: 0.4;
  margin-left: 7px;
  margin-bottom: 6px;
  margin-top: 6px;
`;

const MyProfile = styled.View`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
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

const Friends = ({ navigation }) => {
  const searchFriends = () => {
    navigation.navigate('ScreensRouter', {
      screen: 'SearchFriend',
    });
  };
  const AddFriends = () => {
    navigation.navigate('ScreensRouter', {
      screen: 'AddFriend',
    });
  };
  const onClickFriend = (friend) => {
    navigation.navigate('ModalRouter', {
      screen: 'Profile',
      params: { ...friend },
    });
  };
  return (
    <TabWrapper
      title={'Friends'}
      icons={
        <TopIconsWrapper>
          <TopIconBox onPress={searchFriends}>
            <Ionicons
              style={{ opacity: 0.5 }}
              name="ios-search-outline"
              size={25}
              color="black"
            />
          </TopIconBox>
          <TopIconBox onPress={AddFriends}>
            <Ionicons
              style={{ opacity: 0.5 }}
              name="person-add-outline"
              size={25}
              color="black"
            />
          </TopIconBox>
        </TopIconsWrapper>
      }
    >
      <Container>
        <NonFlatList>
          <FriendsTitle>My profile</FriendsTitle>
          <TouchableOpacity onPress={() => onClickFriend(friendList[0])}>
            <MyProfile>
              <FriendProfile friend={friendList[0]} />
            </MyProfile>
          </TouchableOpacity>
          <FriendsTitle>Friends {friendList.length}</FriendsTitle>
        </NonFlatList>
        <FlatListWrapper>
          <FlatList
            data={friendList}
            keyExtractor={(friend) => friend.id + ''}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={FlatGap}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onClickFriend(item)}>
                <FriendProfile friend={item} />
              </TouchableOpacity>
            )}
          />
        </FlatListWrapper>
      </Container>
    </TabWrapper>
  );
};

export default Friends;
