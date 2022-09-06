import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { friendList } from '../props/friendList';
import { View } from 'react-native';

const ImgContainer = styled.View`
  width: 65px;
  height: 65px;
  padding: 4px;
`;

const ImgWrapper = styled.View`
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-radius: 18px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-left: 3px;
`;

const Img = styled.Image`
  width: 23px;
  height: 23px;
  border-radius: 18px;
  margin: 1px;
`;

const IconView = styled.View`
  width: 23px;
  height: 23px;
  border-radius: 18px;
  background-color: rgba(148, 191, 250, 0.8);
  justify-content: center;
  align-items: center;
`;

const MultiProfileImg = ({ members }) => {
  return (
    <ImgContainer>
      <ImgWrapper>
        {members.slice(0, 4).map((memberId, index) => (
          <View key={index}>
            {/* 임시로 friendList의 index에 대응해두었지만 후에 id에 따른 연산 추가 필요 */}
            {friendList[memberId].coverImg ? (
              <Img source={require('../images/user_profile.jpeg')} />
            ) : (
              <IconView>
                <Ionicons name="person" size={20} color="#cee5ed" />
              </IconView>
            )}
          </View>
        ))}
      </ImgWrapper>
    </ImgContainer>
  );
};

export default MultiProfileImg;
