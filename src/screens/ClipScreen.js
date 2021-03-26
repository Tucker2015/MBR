import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import WebView from 'react-native-webview';

type Props = {};
type State = {};

const win = Dimensions.get('window');
export default class NativeWebpage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={styles.container}>

        <WebView
          source={{ uri: 'https://ktinternet.net/facebook.htm' }}
        />
        <WebView
          source={{ uri: 'https://ktinternet.net/test.html' }}

        // setSupportMultipleWindows={false}
        />
      </View>
    );
  }

}
const styles = StyleSheet.create({

  container: {

    flexDirection: 'row',
    justifyContent: 'center',
    width: win.width / 1.1,
    height: win.height / 3.3,
  }
})