import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GuestInitialStack, GuestRoutes, TabInitialStack, TabRoutes } from "app/routes/tabs";
import locationService from "app/utils/location";
import { LocationObject } from "expo-location";
import * as Location from 'expo-location';
import { IRoute } from "libs/routes";
import { Screen, ScrollView, Text, View } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { Platform, RefreshControl, useWindowDimensions } from "react-native";
import Tab from "./Tab";
import SessionStore from "app/model/session";
import OutletStore from "app/model/outlet";
import { runInAction } from "mobx";
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from "@react-navigation/native";
import NewsStore from "app/model/news";

import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import OrderStore from "app/model/order";
import HistoryStore from "app/model/history";
import EventStore from "app/model/event";
import BannerStore from "app/model/banner";
import MembershipStore from "app/model/membership";

const NavigationTab = createMaterialTopTabNavigator();

export default observer(() => {
  const tabRef = useRef();
  const dim = useWindowDimensions();
  const HEADER_MAX_HEIGHT = dim.height - (dim.height * 3 / 4);
  const nav = useNavigation();
  const meta = useLocalObservable(() => ({
    offset: 0,
    direction: "up",
  }));


  const local = useLocalObservable(() => ({
    lat: 0,
    long: 0,
    ready: false,
    epoch: 0,
    tabInitStack: TabInitialStack,
    tabRoutes: TabRoutes
  }));

  const [location, setLocation] = useState<LocationObject | null>(null);//LocationObject
  const [watcher, setWatcher] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    if (SessionStore.isLoggedIn) {
      runInAction(()=>{
        local.tabInitStack = TabInitialStack
        local.tabRoutes = TabRoutes
      })
    } else {
      runInAction(()=>{
        local.tabInitStack = GuestInitialStack
        local.tabRoutes = GuestRoutes
      })
    }
  }, [SessionStore.isLoggedIn])

  // useEffect(() => {
  //   local.lat = 0;
  //   local.long = 0;

  //   (async () => {
  //     await locationService.askPermission();

  //     let enabled = await Location.hasServicesEnabledAsync()

  //     if (enabled) {
  //       setWatcher(await Location.watchPositionAsync(
  //         { accuracy: Location.Accuracy.High },
  //         (loc) => {
  //           setLocation(loc);
  //           local.ready = true
  //           local.lat = loc.coords.latitude;
  //           local.long = loc.coords.longitude;

  //           // if(SessionStore.latitude==0 && SessionStore.longitude==0){
  //           SessionStore._loadJSON({
  //             latitude: local.lat,
  //             longitude: local.long
  //           })
  //           // }
  //           if (SessionStore.latitude == 0 && SessionStore.longitude == 0) {
  //             runInAction(() => {
  //               SessionStore.latitude = local.lat;
  //               SessionStore.longitude = local.long;
  //             })
  //           }
  //           if (SessionStore.latitude == 0 && SessionStore.longitude == 0) {
  //             SessionStore.latitude = local.lat;
  //             SessionStore.longitude = local.long;
  //           }

            

  //           // if(OutletStore.currentOutlet.firstAppOpen){
  //           //   OutletStore.checkNearestOutletX(local.lat,local.long);
  //           //   if(OutletStore.currentOutlet.nama!==""){
  //           //     runInAction(()=>{
  //           //       OutletStore.currentOutlet.firstAppOpen= false
  //           //     })
  //           //   }
  //           // }
  //         }
  //       ))
  //     } else {

  //     }

  //   })();

  //   return () => {
  //     if (!!watcher) {
  //       watcher.remove()
  //     }
  //   };
  // }, []);



  messaging().getInitialNotification()
    .then(payload => {



      if (!!payload) {
        let item = payload.data;
        switch (item.type) {
          case "News":
            NewsStore.detail.init(item);
            nav.navigate("DetailNews");
            break;
          case "Event" || "Events":
            nav.navigate("Informasi", { data: { index: 0 } });
            break;
          case "Catalog":
            nav.navigate("History");
            break;

          default:
            nav.navigate("Inbox");
            break;
        }
      } else {

      }
    });




  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      //console.log("TOKEN:", token);
    },


    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {


      if (Platform.OS == "ios") {// if (isIos) {
        // alert(JSON.stringify(notification))
        nav.navigate("Inbox");
        if (
          notification.foreground &&
          (notification.userInteraction || notification.remote)
        ) {
          //PushNotification.localNotification(notification);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      } else {

        if (
          notification.foreground &&
          (notification.userInteraction || notification.remote)
        ) {
          switch (notification.data.type) {
            case "News":
              NewsStore.detail.init(notification.data);
              nav.navigate("DetailNews");
              break;
            case "Event" || "Events":
              nav.navigate("Informasi", { data: { index: 0 } });
              break;
            case "Catalog":
              nav.navigate("History");
              break;
            //navigation.navigate(item.name);
            
            default:
              // NotificationStore.detail.init(item._json);
              // nav.navigate("DetailInbox");
              break;
          }
          // NewsStore.detail.init(notification.data);
          // nav.navigate("DetailNews");

          // nav

        }
      }
      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {

      console.log("ACTION:", notification);
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {

      //console.error(err.message, err);
    },

    onRemoteFetch: function (notificationData) {

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

  
  return (
    <Screen
      statusBar={{
        barStyle: "light-content",
        backgroundColor: "#00000000",
      }}
    >
      
        <NavigationTab.Navigator
          {...TabInitialStack}
          tabBar={(props) => (
            <Tab {...props} scrollState={meta} tabRef={tabRef} />
          )}
          sceneContainerStyle={{
            backgroundColor: "#fff",
          }}
          tabBarPosition="bottom"

          lazy={Platform.OS === "android"}
          removeClippedSubviews={Platform.OS === "android"}

          swipeEnabled={false}

        >
          {local.tabRoutes.map(
            (item: IRoute) =>
              !!item.component && (
                <NavigationTab.Screen
                  key={item.name}
                  name={item.name}
                  children={(props) => {
                    const Comp: any = item.component;
                    return <Comp {...props} scrollState={meta} tabRef={tabRef} />;
                  }}
                />
              )
          )}
        </NavigationTab.Navigator>
      


    </Screen>
  );
});
