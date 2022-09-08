import React, { useState } from 'react';
import styled from 'styled-components/native';
import FriendProfile from '../components/friendProfile';
import { Ionicons } from '@expo/vector-icons';
import { BLACK_COLOR, GREEN_COLOR, THICK_WHITE_COLOR } from '../props/colors';

const TouchableMemberWrapper = styled.TouchableOpacity`
  padding-left: 15px;
  padding-right: 15px;
  background-color: ${(props) =>
    props.isChecked
      ? props.isDark
        ? 'rgba(255, 255, 255, 0.3)'
        : THICK_WHITE_COLOR
      : props.isDark
      ? BLACK_COLOR
      : 'white'};
`;

const TouchableCheck = styled.TouchableOpacity`
  z-index: 10;
`;

const AddMemberWrapper = styled.View`
  background-color: ${GREEN_COLOR};
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isChecked ? 1 : 0.3)};
`;

const CreateChatRoomItem = ({
  item,
  toogleMemberCallback,
  onClickMember,
  isDark,
}) => {
  const [checked, setChecked] = useState(false);
  const onPressCheck = () => {
    toogleMemberCallback(item, checked);
    setChecked(!checked);
  };
  return (
    <TouchableMemberWrapper
      isDark={isDark}
      isChecked={checked}
      onPress={() => onClickMember(item)}
    >
      <FriendProfile friend={item} subMessageDisable={true}>
        <TouchableCheck onPress={onPressCheck}>
          <AddMemberWrapper isChecked={checked}>
            <Ionicons name="person-add" size={16} color="white" />
          </AddMemberWrapper>
        </TouchableCheck>
      </FriendProfile>
    </TouchableMemberWrapper>
  );
};

export default CreateChatRoomItem;
