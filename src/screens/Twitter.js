import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#000' }}>
        <StatusBar barStyle="light-content" />
        <View style={{
          flexDirection: 'row', justifyContent: 'center', height: '100%', width: '100%'
        }}>

          <WebView
            originWhitelist={['*']}
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            source={{ uri: 'https://m.twitter.com/MBRADIOUS' }}
          />

        </View>
      </SafeAreaView>
    );
  }
}