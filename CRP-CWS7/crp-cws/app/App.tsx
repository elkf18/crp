import { useNavigation } from "@react-navigation/core";
import GlobalStore from "app/model/global";
import NotificationStore from "app/model/notification";
import SessionStore from "app/model/session";
import Loading from "app/pages/Loading";
import {
  PrivateInitialStack,
  PrivateRoutes,
  PublicInitialStack,
  PublicRoutes,
} from "app/routes";
import PrivateService from "app/services/private-services";
import PublicService from "app/services/public-services";
import * as Notifications from "expo-notifications";
import useNotification from "libs/hooks/useNotification";
import { IRoute } from "libs/routes";
import { AppProvider, CodePush, ReactNavigation } from "libs/ui";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ToastAndroid } from "react-native";
import OutletStore from "./model/outlet";
import messaging from '@react-native-firebase/messaging';
import NewsStore from "./model/news";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import PushNotification from "react-native-push-notification";

const loadingComponent = (props: any) => {
  runInAction(() => {
    OutletStore.currentOutlet.firstAppOpen = true
  })
  return <Loading {...props} />;
};



async function requestUserPermission() {
  //const authorizationStatus = await messaging().requestPermission();

  // if (authorizationStatus) {
  //   ////console.log('Permission status:', authorizationStatus);
  // }
}

// Notifications.addNotificationResponseReceivedListener(response => {
//   //console.log(response);
// });

// Notifications.addListener(notification => {

//   let { toScreen } = notification.data;

//   // send user to screen

// });
export default observer(() => {
  let [initialStack, setInitialStack] = useState({} as any);
  const [routes, setRoutes] = useState([] as IRoute[]);


  useEffect(() => {

    requestUserPermission()
    const authContext = SessionStore.AuthContext;
    if (!!authContext && !!authContext.isLoggedIn) {
      let nroutes = PrivateRoutes;
      setInitialStack(PrivateInitialStack);
      setRoutes(nroutes);
      PrivateService();
    } else {
      setInitialStack(PublicInitialStack);
      setRoutes(PublicRoutes);
      PublicService();
    }


  }, [SessionStore.AuthContext]);

  useEffect(() => {
    if (Platform.OS == "ios") {
      const type = 'notification';
      PushNotificationIOS.addEventListener(type, onRemoteNotification);
      return () => {
        PushNotificationIOS.removeEventListener(type);
      };
    }
    
  });
  const onRemoteNotification = (notification:any) => {
    
    const isClicked = notification.getData().userInteraction === 1;
    
    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
    // Use the appropriate result based on what you needed to do for this notification
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };

  useNotification(
    async ({ token }) => {
      runInAction(() => (GlobalStore.deviceToken = token));
    },
    (token) => {
      if (!!token) {
        runInAction(() => (GlobalStore.deviceToken = token));
        SessionStore.updateDeviceToken();
      }
    },
    (appState, message) => {
      if (SessionStore.AuthContext.isLoggedIn) {
        if (appState === "active") {
          let n = message.notification;
          // alert("Berita baru tersedia.")
          Notifications.addNotificationReceivedListener(response => {
            //console.log(JSON.stringify(message?.data?.type))
            
            if (message?.data?.type == "News" || message?.data?.type == "Events") {
              // ToastAndroid.show("Berita baru tersedia.", ToastAndroid.SHORT)
              if(!NotificationStore.list.some(cred => cred.data.tag === message?.data?.tag)){
                // ToastAndroid.show("Berita baru tersedia.", ToastAndroid.SHORT)
                //PushNotification.localNotification(message?.notification);
              }
              

            } else if (message?.data?.type == "Order_Paid" || message?.data?.type == "Order_Completed") {
              // ToastAndroid.show("Berita baru tersedia.", ToastAndroid.SHORT)
              if(!NotificationStore.list.some(cred => cred.data.tag === message?.data?.tag)){
                // ToastAndroid.show("Berita baru tersedia.", ToastAndroid.SHORT)
                //PushNotification.localNotification(message?.notification);
              }
              

            }


          })


          Notifications.scheduleNotificationAsync({
            content: { title: n?.title, body: n?.body },
            trigger: null,
          });



        }


        NotificationStore.receiveNotif(message);
      }
    },
    []
  );





  return (
    <AppProvider>
      <CodePush LoadingComponent={loadingComponent}>
        <ReactNavigation {...initialStack} routes={routes} mode="default" />
      </CodePush>
    </AppProvider>
  );
});
