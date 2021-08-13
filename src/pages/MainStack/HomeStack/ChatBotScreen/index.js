import React from 'react';
import {WebView} from 'react-native-webview';

const ChatBotScreen = ({navigation}) => {
  return (
    <WebView
      source={{
        uri: 'https://widget.chataja.co.id/?key=a255c8761f158945f9a9069718da73cd644ff62b',
      }}
      sharedCookiesEnabled={true}
      incognito={false}
    />
  );
};

export default ChatBotScreen;
