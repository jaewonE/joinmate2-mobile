import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { WHITE_COLOR, ALL_BLACK_COLOR } from '../props/colors';

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
  border-bottom-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
`;

const Title = styled.Text`
  padding-left: 30px;
  font-size: 24px;
  font-weight: 700;
  opacity: 0.7;
  color: ${(props) => props.theme.generalTextColor};
`;

const SettingItem = ({ onPress, title, icon, isDark }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemView isDark={isDark}>
        <Ionicons
          style={{ opacity: 0.7 }}
          name={icon}
          size={35}
          color={isDark ? WHITE_COLOR : ALL_BLACK_COLOR}
        />
        <Title>{title}</Title>
      </ItemView>
    </TouchableOpacity>
  );
};

export default SettingItem;
