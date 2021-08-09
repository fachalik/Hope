/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../assets/colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {logo2} from '../../../../assets';
import config from '../../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import uuid from 'react-native-uuid';

const ChatBotScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [responTempMsg, setresponTempMsg] = useState([]);
  const [user, setUser] = useState(null);
  const [responseMessage, setResponseMessage] = useState([
    {
      _id: '',
      text: '',
      createdAt: new Date(),
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    },
  ]);

  const BOT = {
    _id: 'bot_' + user,
    name: 'Hope',
    avatar: logo2,
  };

  useEffect(async () => {
    let username;
    username = null;
    try {
      username = await AsyncStorage.getItem('userName');
      setUser(username);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    setMessages([]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    axios
      .post(config.API_CHAT_URL, {
        sender: messages[0].user._id,
        message: messages[0].text,
      })
      .then(function (response) {
        response.data.map(item => {
          if (!item.image) {
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [
                {
                  _id: uuid.v4(),
                  text: item.text,
                  createdAt: new Date(),
                  user: BOT,
                },
              ]),
            );
          } else {
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, [
                {
                  _id: uuid.v4(),
                  image: item.image,
                  createdAt: new Date(),
                  user: BOT,
                },
              ]),
            );
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: uuid.v4(),
            text: 'Halo..',
            createdAt: new Date(),
            user: BOT,
          },
        ]),
      );
    }, 1000);
  }, [null]);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <Icon
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 'user_' + user,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        textInputStyle={{color: colors.black}}
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  container: {},
  inputToolbar: {
    color: colors.yellow,
  },
});
