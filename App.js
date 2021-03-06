import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from "react-native-bootsplash";
import AppNavigation from './src/navigation/AppNavigation';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import OneSignal from 'react-native-onesignal';

let bootSplashLogo = require("./assets/bootsplash_logo.png");

let fakeApiCallWithoutBadNetwork = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let App = () => {

  let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  let opacity = useRef(new Animated.Value(1));
  let translateY = useRef(new Animated.Value(0));

  let init = async () => {
    await fakeApiCallWithoutBadNetwork(1000);
    await BootSplash.hide();

    Animated.stagger(250, [
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: -50,
      }),
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: Dimensions.get("window").height,
      }),
    ]).start();
    Animated.timing(opacity.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 150,
      delay: 350,
    }).start(() => {
      setBootSplashIsVisible(false);
    });
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
    OneSignal.setAppId("04e121b6-0397-4781-9405-9ba01db759a3");
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log("Prompt response:", response);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
      let notif = notifReceivedEvent.getNotification();

      const button1 = {
        text: "Cancel",
        onPress: () => { notifReceivedEvent.complete(); },
        style: "cancel"
      };

      const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

      Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      console.log("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      console.log("OneSignal: email subscription changed: ", event);
    });
    // OneSignal.addSubscriptionObserver(event => {
    //   console.log("OneSignal: subscription changed:", event);
    //   this.setState({ isSubscribed: event.to.isSubscribed })
    // });
    OneSignal.addPermissionObserver(event => {
      console.log("OneSignal: permission changed:", event);
    });


  }, [bootSplashLogoIsLoaded]);

  return (
    <NavigationContainer>
      <AppNavigation></AppNavigation>
      {bootSplashIsVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.bootsplash,
            { opacity: opacity.current },
          ]}
        >
          <Animated.Image
            source={bootSplashLogo}
            fadeDuration={0}
            onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
            style={[
              styles.logo,
              { transform: [{ translateY: translateY.current }] },
            ]}
          />
        </Animated.View>
      )}

    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#Fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    margin: 20,
    lineHeight: 30,
    color: "#333",
    textAlign: "center",
  },
  bootsplash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    height: 300,
    width: 300,
  },
});
export default App;
