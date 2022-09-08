import styled from 'styled-components/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';

const Container = styled.SafeAreaView`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.generalBgColor};
`;

const ContainerView = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  flex: 1;
`;

const TopBar = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const TopBarTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.generalTextColor};
`;

const IconView = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const SimpleTabWrapper = ({
  children,
  title,
  icons,
  bgColor = null,
}) => (
  <Container bgColor={bgColor}>
    <ContainerView>
      <TopBar>
        <TopBarTitle>{title}</TopBarTitle>
        <IconView>{icons && icons}</IconView>
      </TopBar>
      {children}
    </ContainerView>
  </Container>
);
