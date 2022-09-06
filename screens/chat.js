import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../props/common';
import { friendList } from '../props/friendList';
import { BLUE_COLOR, GREEN_COLOR } from '../props/colors';
import ProfileImg from '../components/profileImg';
import { Animated } from 'react-native';

const Container = styled.SafeAreaView`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  flex: 1;
`;

const StatusWrapper = styled.View`
  width: 100%;
  height: 40px;
  padding-top: 5px;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const StatusIconWrapper = styled.View`
  position: absolute;
  top: 3px;
  padding-left: 5px;
  padding-right: 5px;
`;

const StatusLeftIconWrapper = styled(StatusIconWrapper)`
  left: 3px;
`;

const StatusRightWrapper = styled(StatusIconWrapper)`
  right: 3px;
  top: 2px;
`;

const TouchableStatusIcon = styled.TouchableOpacity`
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

const StatusTitleWrapper = styled.Text`
  font-size: 18px;
  font-weight: 600; ;
`;

const ChatListWrapper = styled.FlatList`
  width: 100%;
  flex: 1;
  background-color: #ffd8bc; // #BCD8FF: kakao
`;
const ChatWrapper = styled.View`
  width: 100%;
  padding-left: 5px;
  padding-right: 10px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${(props) => (props.myChat ? 'flex-end' : 'flex-start')};
`;

const ChatMessageContainer = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 7px;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: ${(props) => (props.myChat ? 0 : 0)}px;
  padding-right: ${(props) => (props.myChat ? 0 : 0)}px;
`;
const ChatMessageName = styled.Text`
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 5px;
`;
const ChatMessageWrapper = styled.View`
  width: 100%;
  flex-direction: ${(props) => (props.myChat ? 'row' : 'row-reverse')};
  justify-content: flex-end;
  align-items: flex-end;
`;
const ChatMessageView = styled.View`
  padding: 10px;
  border-radius: 8px;
  align-items: flex-start;
  border-top-left-radius: ${(props) => (props.myChat ? 8 : 0)}px;
  border-bottom-right-radius: ${(props) => (props.myChat ? 0 : 8)}px;
  background-color: ${(props) => (props.myChat ? '#405de6' : 'white')};
`;
const ChatMessageText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => (props.myChat ? 'white' : 'black')};
`;
const ChatMessageTime = styled.Text`
  font-size: 11px;
  font-weight: 300;
  opacity: 0.7;
  padding: 3px;
  padding-top: 0px;
`;
const MessageGap = styled.View`
  height: 10px;
`;

const InputWrapper = styled(Animated.View)`
  width: 100%;
  min-height: 50px;
`;
const InputInnerWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 7px;
  padding-bottom: 5px;
  padding-right: 8px;
  position: relative;
`;
const TouchableOptionBtn = styled.TouchableOpacity`
  width: 30px;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  margin-left: 2px;
  margin-right: 1px;
`;
const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 45px;
`;
const SubmitWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 9px;
  right: 16px;
  width: 28px;
  height: 30px;
  background-color: white;
`;
const AbsoluteOptionBtn = styled.TouchableOpacity`
  position: absolute;
  top: 7px;
  left: 8px;
  width: 30px;
  z-index: 10;
`;
const ScrollOptionWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
const TouchableOptionWrapper = styled.TouchableOpacity`
  height: 120px;
  width: 65px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  margin-left: 25px;
`;
const OptionView = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${(props) => props.bgColor};
  justify-content: center;
  align-items: center;
`;
const OptionName = styled.Text`
  margin-top: 7px;
  font-size: 13px;
  font-weight: 400;
`;

const messageList = [
  {
    user: {
      id: 1,
      name: 'name1',
      coverImg: '',
      stateMessage: null,
    },
    message: 'message0',
  },
];

const useInterval = (callback, delay) => {
  const intervalRef = useRef();
  const callbackRef = useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setInterval ticks again, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // interval will be reset.

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval:

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(
        () => callbackRef.current(),
        delay
      );

      // Clear interval if the components is unmounted or the delay changes:
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  // Returns a ref to the interval ID in case you want to clear it manually:
  return intervalRef;
};

const useScrollDown = false;

const Chat = ({ navigation: { goBack } }) => {
  const inputRef = useRef();
  const flatlistRef = useRef();
  const [input, setInput] = useState('');
  const [chatList, setChatList] = useState([]);

  // Animation
  const [showOptions, setShowOptions] = useState(false);
  const [bottomTabHeight] = useState(new Animated.Value(50));
  const [animatedOp, setOp] = useState(new Animated.Value(1));
  const toggleOptions = () => {
    if (showOptions) {
      Animated.timing(bottomTabHeight, {
        toValue: 50,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottomTabHeight, {
        toValue: 130,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setTimeout(() => setShowOptions((prev) => !prev), 100);
    Animated.sequence([
      Animated.timing(animatedOp, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOp, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const intervalRef = useInterval(() => {
    if (chatList.length < 100) {
      setChatList([
        ...chatList,
        {
          user: {
            id: chatList.length % 2,
            name: `name${(chatList.length % 2) + 1}`,
            coverImg: '',
            stateMessage: null,
          },
          messageId: chatList.length + 1,
          message: `message ${chatList.length + 1}`,
        },
      ]);
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, 500);

  useEffect(() => {
    if (useScrollDown) {
      flatlistRef.current.scrollToEnd();
    }
  }, [chatList]);

  const submitInput = () => {
    if (input) {
      console.log(input);
      setInput('');
      inputRef.current.focus();
    }
  };

  return (
    <Container>
      <StatusWrapper>
        <StatusLeftIconWrapper>
          <TouchableStatusIcon onPress={goBack}>
            <Ionicons name="ios-chevron-back" size={24} color="black" />
          </TouchableStatusIcon>
        </StatusLeftIconWrapper>
        <StatusTitleWrapper>JoinMate2</StatusTitleWrapper>
      </StatusWrapper>
      <ChatListWrapper
        ref={flatlistRef}
        data={chatList}
        keyExtractor={(message) => message.messageId + ''}
        ItemSeparatorComponent={MessageGap}
        renderItem={({ item }) => {
          const isMyChat = item.user.id === 1;
          return (
            <ChatWrapper key={item.messageId} myChat={isMyChat}>
              {!isMyChat && (
                <ProfileImg
                  width={55}
                  borderRadius={14}
                  padding={3}
                  iconSize={22}
                  coverImg={item.user.coverImg}
                />
              )}
              <ChatMessageContainer myChat={isMyChat}>
                {!isMyChat && <ChatMessageName>곽재원</ChatMessageName>}
                <ChatMessageWrapper myChat={isMyChat}>
                  <ChatMessageTime>오후 5:34</ChatMessageTime>
                  <ChatMessageView myChat={isMyChat}>
                    <ChatMessageText myChat={isMyChat}>
                      {item.message}
                    </ChatMessageText>
                  </ChatMessageView>
                </ChatMessageWrapper>
              </ChatMessageContainer>
            </ChatWrapper>
          );
        }}
      />
      <InputWrapper style={{ height: bottomTabHeight }}>
        {showOptions ? (
          <InputInnerWrapper style={{ opacity: animatedOp }}>
            <AbsoluteOptionBtn onPress={toggleOptions}>
              <Ionicons
                style={{ opacity: 0.4 }}
                name="ios-close"
                size={30}
                color="black"
              />
            </AbsoluteOptionBtn>
            <ScrollOptionWrapper
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOptionWrapper>
                <OptionView bgColor={BLUE_COLOR}>
                  <Ionicons name="ios-images-outline" size={28} color="white" />
                </OptionView>
                <OptionName>Image</OptionName>
              </TouchableOptionWrapper>
              <TouchableOptionWrapper>
                <OptionView bgColor={'#DB4437'}>
                  <Ionicons
                    name="md-camera-outline"
                    size={30}
                    style={{ paddingBottom: 2 }}
                    color="white"
                  />
                </OptionView>
                <OptionName>Camera</OptionName>
              </TouchableOptionWrapper>
              <TouchableOptionWrapper>
                <OptionView bgColor={'#F4B400'}>
                  <Ionicons
                    name="ios-videocam-outline"
                    size={30}
                    style={{ paddingLeft: 2 }}
                    color="white"
                  />
                </OptionView>
                <OptionName>FaceTime</OptionName>
              </TouchableOptionWrapper>
              <TouchableOptionWrapper>
                <OptionView bgColor={'#0F9D58'}>
                  <Ionicons name="ios-call-outline" size={28} color="white" />
                </OptionView>
                <OptionName>VoiceTime</OptionName>
              </TouchableOptionWrapper>
              <TouchableOptionWrapper>
                <OptionView bgColor={BLUE_COLOR}>
                  <Ionicons name="ios-images-outline" size={28} color="white" />
                </OptionView>
                <OptionName>Image</OptionName>
              </TouchableOptionWrapper>
            </ScrollOptionWrapper>
          </InputInnerWrapper>
        ) : (
          <InputInnerWrapper style={{ opacity: animatedOp }}>
            <TouchableOptionBtn onPress={toggleOptions}>
              <Ionicons
                style={{ opacity: 0.4 }}
                name="add"
                size={30}
                color="black"
              />
            </TouchableOptionBtn>
            <TextInput
              value={input}
              ref={inputRef}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={submitInput}
            />
            <SubmitWrapper onPress={submitInput}>
              <Ionicons name="arrow-up-circle" size={32} color={GREEN_COLOR} />
            </SubmitWrapper>
          </InputInnerWrapper>
        )}
      </InputWrapper>
    </Container>
  );
};

export default Chat;
