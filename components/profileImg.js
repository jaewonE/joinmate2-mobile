import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const ProfileImgWrapper = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width}px;
  padding: ${(props) => props.innerPadding}px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.innerPadding + 3}px;
  border-radius: ${(props) => props.borderRadius}px;
`;

const ProfileIconView = styled.View`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.innerPadding + 3}px;
  border-radius: ${(props) => props.borderRadius}px;
  background-color: rgba(148, 191, 250, 0.8);
  justify-content: center;
  align-items: center;
`;

const ProfileImg = ({
  coverImg,
  width = 65,
  borderRadius = 18,
  innerPadding = 7,
  iconSize = 30,
}) => (
  <ProfileImgWrapper width={width} innerPadding={innerPadding}>
    {coverImg ? (
      <ProfileImage
        borderRadius={borderRadius}
        innerPadding={innerPadding}
        source={require('../images/user_profile.jpeg')}
      />
    ) : (
      <ProfileIconView innerPadding={innerPadding} borderRadius={borderRadius}>
        <Ionicons name="person" size={iconSize} color="#cee5ed" />
      </ProfileIconView>
    )}
  </ProfileImgWrapper>
);

export default ProfileImg;
