import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import SwitchToggle from 'react-native-switch-toggle';
import { GREEN_COLOR } from '../props/colors';
import { Alert } from 'react-native';

const Wrapper = styled.View`
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 5px;
  opacity: ${(props) => (props.disable ? 0.3 : 1)};
`;

const TitleWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-left: 5px;
`;

const Title = styled.Text`
  font-size: ${(props) => (props.hasSubTitle ? 21 : 23)}px;
  font-weight: 400;
  padding-bottom: ${(props) => (props.hasSubTitle ? 5 : 15)}px;
  color: ${(props) => props.theme.generalTextColor};
`;

const SubTitle = styled.Text`
  font-size: 14px;
  opacity: ${(props) => (props.disable ? 1 : 0.5)};
  padding-bottom: 5px;
  color: ${(props) => props.theme.generalTextColor};
`;

const ToogleWrapper = styled.View`
  width: 80px;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  padding-right: 5px;
`;

const SettingToggle = ({
  title,
  subTitle,
  callPressCallback,
  initialState = false,
  disable = false,
  disableMessage,
  isDark,
}) => {
  const [on, off] = useState(initialState);
  const [disAble, setDisAble] = useState(disable);

  const onPress = async () => {
    if (!disable) {
      const permit = await callPressCallback(on);
      if (permit) off(!on);
      return;
    }
    if (disableMessage)
      Alert.alert(disableMessage, [{ text: 'OK', style: 'cancel' }]);
  };

  useEffect(() => {
    setDisAble(disable);
  }, [disable]);

  return (
    <Wrapper isDark={isDark} disable={disAble}>
      <TitleWrapper>
        <Title
          isDark={isDark}
          disable={disAble}
          hasSubTitle={Boolean(subTitle)}
        >
          {title}
        </Title>
        {subTitle && <SubTitle disable={disAble}>{subTitle}</SubTitle>}
      </TitleWrapper>
      <ToogleWrapper>
        <SwitchToggle
          switchOn={on}
          onPress={onPress}
          circleColorOff="#FFF"
          circleColorOn="#FFF"
          backgroundColorOn={disAble ? 'lightgray' : GREEN_COLOR}
          backgroundColorOff="lightgray"
          containerStyle={{
            marginTop: -3,
            width: 65,
            height: 35,
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 25,
            height: 25,
            borderRadius: 20,
          }}
        />
      </ToogleWrapper>
    </Wrapper>
  );
};

export default SettingToggle;
