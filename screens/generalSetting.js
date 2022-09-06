import React, { useState } from 'react';
import styled from 'styled-components/native';
import TabWrapper from '../components/tabWrapper';
import SettingToggle from '../components/settingToggle';
import { TouchableOpacity } from 'react-native';

const TopBarAddText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  opacity: 0.5;
`;

const TopGap = styled.View`
  height: 10px;
`;

const GeneralSetting = ({ navigation: { goBack } }) => {
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(true);

  const systemDarkMode = (mode) => {
    console.log('systemDarkMode: ', mode);
    setIsSystemDarkMode(!mode);
    return true;
  };

  const toggleDarkMode = (mode) => {
    console.log('toggleDarkMode: ', mode);
    return true;
  };

  const toggleAutoScroll = (mode) => {
    console.log('toggleAutoScroll: ', mode);
    return true;
  };

  return (
    <TabWrapper
      title="General"
      icons={
        <TouchableOpacity onPress={goBack}>
          <TopBarAddText>Exit</TopBarAddText>
        </TouchableOpacity>
      }
    >
      <TopGap />
      <SettingToggle
        title="Use system Theme"
        subTitle="set app theme by system"
        callPressCallback={systemDarkMode}
        initialState={isSystemDarkMode}
      />
      <SettingToggle
        title="Dark Mode"
        callPressCallback={toggleDarkMode}
        disable={isSystemDarkMode}
        disableMessage="Can't set Dark mode whlie using system theme"
      />
      <SettingToggle
        title="Auto scroll down"
        callPressCallback={toggleAutoScroll}
        disableMessage="Auto scroll down when new chat updated."
        initialState={true}
      />
    </TabWrapper>
  );
};

export default GeneralSetting;
