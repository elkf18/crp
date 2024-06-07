import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from 'react-native'
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import * as React from 'react';

import App from './App';

import { useNavigation } from "@react-navigation/native";
import NewsStore from "app/model/news";


PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },


  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log("Notification:", notification);
   
    //console.log(JSON.stringify(notification))
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    // if (Platform.OS == "ios") {
    //   //console.log(JSON.stringify(notification));
    //   //alert(JSON.stringify(notification));
    //   if (
    //     notification.foreground &&
    //     (notification.userInteraction || notification.remote)
    //   ) {
    //     // if (message?.data?.type == "News") {
    //     //   if (!NotificationStore.list.some(cred => cred.data.tag === message?.data?.tag)) {
    //     //     PushNotification.localNotification(message?.notification);
    //     //   }


    //     // } else {

    //     // }
    //     PushNotification.localNotification(notification);
    //   }
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    // }else{
    //   // if (
    //   //   notification.foreground &&
    //   //   (notification.userInteraction || notification.remote)
    //   // ) {
    //   //   useNavigation().navigate("DetailNews");
    //   //   //NewsStore.detail.init(item);
    //   //   // nav
        
    //   // }
    // }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification);

    //console.log("ACTION:", token);
    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.log("Error:", err);

    //console.error(err.message, err);
  },

  onRemoteFetch: function (notificationData) {
    console.log("notificationData:", notificationData);

    //console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});




PushNotification.createChannel(
  {
    channelId: "News_Channel", // (required)
    channelName: "News_Channel", // (required)
    channelDescription: "News Notification", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  () => console.log(`News_Channel created`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: "Event_Channel", // (required)
    channelName: "Event_Channel", // (required)
    channelDescription: "Event Notification", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  () => console.log(`Event_Channel created`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: "Order_Paid", // (required)
    channelName: "Order_Paid", // (required)
    channelDescription: "Your order has been paid", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  () => console.log(`Order_Paid created`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: "Order_Completed", // (required)
    channelName: "Order_Completed", // (required)
    channelDescription: "Your order has been completed", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  () => console.log(`Order_Complete created`) // (optional) callback returns whether the channel was created, false means it already existed.
);
//registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

if (Platform.OS !== "ios") {
  registerRootComponent(App);
} else {
  AppRegistry.registerComponent('jokopi', () => App);
}

// registerRootComponent(App);
