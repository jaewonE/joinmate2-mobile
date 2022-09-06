import React from 'react';
import styled from 'styled-components/native';
import MultiProfileImg from './multiProfileImg';
import ProfileImg from './profileImg';

const Wrapper = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const DetailWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-left: 10px;
  padding-left: 2px;
  padding-bottom: 12px;
`;

const NameWrapper = styled.View`
  flex: ${(props) => (props.hasLastMessage ? 6 : 1)};
  padding-bottom: ${(props) => (props.hasLastMessage ? 2 : 3)}px;
  flex-direction: row;
  align-items: ${(props) => (props.hasLastMessage ? 'flex-end' : 'center')};
  justify-content: flex-start;
`;

const NameText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const MemberLenText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  opacity: 0.4;
  margin-left: 5px;
  padding-bottom: 1px;
`;

const LastMessage = styled.View`
  flex: 4;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StateText = styled.Text`
  font-size: 14px;
  font-weight: 300;
  opacity: 0.5;
`;

const ChatRoom = ({ chatRoom }) => (
  <Wrapper>
    {chatRoom.private || chatRoom.coverImg ? (
      <ProfileImg coverImg={chatRoom.coverImg} />
    ) : (
      <MultiProfileImg members={chatRoom.members} />
    )}
    <DetailWrapper>
      <NameWrapper hasLastMessage={Boolean(chatRoom.lastMessage)}>
        <NameText>{chatRoom.name}</NameText>
        {!chatRoom.private && (
          <MemberLenText>{chatRoom.members.length}</MemberLenText>
        )}
      </NameWrapper>
      {chatRoom.lastMessage && (
        <LastMessage>
          <StateText>
            {chatRoom.lastMessage.length > 30
              ? `${chatRoom.lastMessage.slice(0, 30)}...`
              : chatRoom.lastMessage}
          </StateText>
        </LastMessage>
      )}
    </DetailWrapper>
  </Wrapper>
);

export default ChatRoom;
