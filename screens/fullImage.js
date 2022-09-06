import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';

const SafeArea = styled.SafeAreaView`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  background-color: black;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const ErrorText = styled.Text`
  font-size: 30px;
  font-weight: 600;
`;

const FullImage = ({
  navigation: { goBack },
  route: { params: imagePath },
}) => (
  <SafeArea>
    <TouchableWithoutFeedback onPress={goBack}>
      <Container>
        {imagePath ? (
          <Image
            source={require('../images/user_profile.jpeg')}
            resizeMode="contain"
          />
        ) : (
          <ErrorText>Something Wrong...</ErrorText>
        )}
      </Container>
    </TouchableWithoutFeedback>
  </SafeArea>
);
export default FullImage;
