import styled from 'styled-components/native';
import { isIos, SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';

const Container = styled.SafeAreaView`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  background-color: ${(props) => props.theme.generalBgColor};
`;

const ContainerView = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${isIos ? 5 : 10}px;
  padding-bottom: 5px;
  justify-content: ${(props) => (props.centerAlign ? 'center' : 'flex-start')};
  align-items: ${(props) => (props.centerAlign ? 'center' : 'flex-start')};
  flex: 1;
`;

const TopBar = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 27px;
  font-weight: 700;
  color: ${(props) => props.theme.generalTextColor};
`;

const TabWrapper = ({ children, title, icons, centerAlign = false }) => (
  <Container>
    <ContainerView centerAlign={centerAlign}>
      <TopBar>
        <Title>{title}</Title>
        {icons && icons}
      </TopBar>
      {children}
    </ContainerView>
  </Container>
);

export default TabWrapper;
