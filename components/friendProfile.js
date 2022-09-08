import React from 'react';
import styled from 'styled-components/native';
import ProfileImg from './profileImg';

const ProfileWrapper = styled.View`
  width: 100%;
  height: 65px;
  flex-direction: row;
  justify-content: flex-start;
`;

const ProfileDetailWrapper = styled.View`
  width: 100%;
  margin-left: 10px;
  padding-top: 7px;
  padding-bottom: 10px;
  padding-left: 2px;
`;

const ProfileNameWrapper = styled.View`
  flex: ${(props) => (props.hasStateMessage ? 6 : 1)};
  padding-bottom: ${(props) => (props.hasStateMessage ? 2 : 3)}px;
  justify-content: ${(props) =>
    props.hasStateMessage ? 'flex-end' : 'center'};
  align-items: flex-start;
`;

const ProfileNameText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.generalTextColor};
`;

const ProfileStateWrapper = styled.View`
  flex: 4;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProfileStateText = styled.Text`
  font-size: 14px;
  font-weight: 300;
  opacity: 0.5;
  color: ${(props) => props.theme.generalTextColor};
`;

const ChildrenWrapper = styled.View`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 65px;
  width: 65px;
  justify-content: center;
  align-items: center;
`;

const FriendProfile = ({ friend, subMessageDisable = false, children }) => (
  <ProfileWrapper>
    <ProfileImg coverImg={friend.coverImg} />
    <ProfileDetailWrapper>
      <ProfileNameWrapper
        hasStateMessage={friend.stateMessage && !subMessageDisable}
      >
        <ProfileNameText>{friend.name}</ProfileNameText>
      </ProfileNameWrapper>
      {friend.stateMessage && !subMessageDisable && (
        <ProfileStateWrapper>
          <ProfileStateText>
            {friend.stateMessage.length > 30
              ? `${friend.stateMessage.slice(0, 30)}...`
              : friend.stateMessage}
          </ProfileStateText>
        </ProfileStateWrapper>
      )}
    </ProfileDetailWrapper>
    {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
  </ProfileWrapper>
);

export default FriendProfile;
