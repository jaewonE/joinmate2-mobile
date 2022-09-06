import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, View } from 'react-native';

const TouchableContainer = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;

const Container = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TopGap = styled.View`
  flex: 55;
`;

const ContextView = styled.View`
  flex: 45;
  width: 100%;
`;

const ProfileWrapper = styled.View`
  flex: 65;
  align-items: center;
  justify-content: center;
  padding-left: 10%;
  padding-right: 10%;
`;
const ProfileView = styled.View`
  align-items: center;
`;

const CoverImg = styled.Image`
  margin-top: 3%;
  width: 100px;
  height: 100px;
  border-radius: 32px;
`;

const Name = styled.Text`
  margin-top: ${(params) => (params.hasStateMessage ? '10px' : '15px')};
  font-size: 32px;
  font-weight: 600;
  color: white;
`;
const StateMessage = styled.Text`
  margin-top: 7px;
  font-size: 15px;
  font-weight: 400;
  color: white;
  text-align: center;
`;

const OptionsView = styled.View`
  flex: 35;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  border-top-width: 2px;
  border-top-color: rgba(255, 255, 255, 0.2);
  padding-left: ${(props) => (props.singleItem ? 0 : 2)}%;
`;

const IconWrapper = styled.TouchableOpacity`
  padding-top: 5%;
  justify-content: center;
  align-items: center;
  width: 25%;
`;

const IconText = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

const Profile = ({ navigation, route: { params: user } }) => {
  const isSelf = useRef(false);
  const [isFriend, setIsFriend] = useState(false);

  const seeFullImage = (imagePath) => {
    navigation.navigate('ModalRouter', {
      screen: 'FullImage',
      params: { imagePath },
    });
  };
  const addFriend = () => {
    console.log('Add friend!');
    setIsFriend(true);
  };
  const navigateTo = (to) => {
    navigation.goBack();
    navigation.navigate('ScreensRouter', {
      screen: to,
    });
  };

  return (
    <TouchableContainer
      onPress={() => seeFullImage('../images/profile_background.jpeg')}
    >
      <View>
        <Container
          source={require('../images/profile_background.jpeg')}
          resizeMode="cover"
        >
          <TopGap />
          <ContextView>
            <ProfileWrapper>
              <ProfileView>
                <TouchableWithoutFeedback
                  onPress={() => seeFullImage('../images/user_profile.jpeg')}
                >
                  <CoverImg source={require('../images/user_profile.jpeg')} />
                </TouchableWithoutFeedback>
                <Name hasStateMessage={Boolean(user?.stateMessage)}>
                  {user.name}
                </Name>
                {user?.stateMessage && (
                  <StateMessage>
                    {user.stateMessage.length > 51
                      ? `${user.stateMessage.slice(0, 51)}...`
                      : user.stateMessage}
                  </StateMessage>
                )}
              </ProfileView>
            </ProfileWrapper>
            <OptionsView singleItem={!isFriend && !isSelf.current}>
              {(isFriend || isSelf.current) && (
                <IconWrapper onPress={() => navigateTo('Chat')}>
                  <Ionicons name="chatbubble" size={28} color="white" />
                  <IconText>{isSelf.current ? 'my Chat' : '1:1 Chat'}</IconText>
                </IconWrapper>
              )}
              {isSelf.current && (
                <IconWrapper onPress={() => navigateTo('EditProfile')}>
                  <Ionicons name="pencil" size={28} color="white" />
                  <IconText>Edit Profile</IconText>
                </IconWrapper>
              )}
              {isFriend && !isSelf.current && (
                <IconWrapper onPress={() => navigateTo('FaceTime')}>
                  <Ionicons name="ios-videocam" size={28} color="white" />
                  <IconText>FaceTime</IconText>
                </IconWrapper>
              )}
              {isFriend && !isSelf.current && (
                <IconWrapper onPress={() => navigateTo('VoiceTime')}>
                  <Ionicons name="ios-call-sharp" size={28} color="white" />
                  <IconText>VoiceTime</IconText>
                </IconWrapper>
              )}
              {!isFriend && !isSelf.current && (
                <IconWrapper onPress={addFriend}>
                  <Ionicons name="ios-person-add" size={28} color="white" />
                  <IconText>Add Friend</IconText>
                </IconWrapper>
              )}
            </OptionsView>
          </ContextView>
        </Container>
      </View>
    </TouchableContainer>
  );
};

export default Profile;
