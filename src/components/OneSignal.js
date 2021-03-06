import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class OneSig extends Component {
    constructor(properties) {
        super(properties);
        OneSignal.init("04e121b6-0397-4781-9405-9ba01db759a3");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
    }
    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }
    onIds(device) {
        console.log('Device info: ', device);
    }
}