import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const ItemView = styled.View`
  width: 100%;
  height: 80px;
  padding-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled.Text`
  padding-left: 30px;
  font-size: 24px;
  font-weight: 700;
  opacity: 0.7;
`;

const SettingItem = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemView>
        <Ionicons style={{ opacity: 0.7 }} name={icon} size={35} />
        <Title>{title}</Title>
      </ItemView>
    </TouchableOpacity>
  );
};

export default SettingItem;
