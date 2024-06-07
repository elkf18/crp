import { useIsFocused } from "@react-navigation/native";
import BannerStore from "app/model/banner";
import EventStore from "app/model/event";
import MembershipStore from "app/model/membership";
import MerchandiseStore from "app/model/merchandise";
import NewsStore from "app/model/news";
import OutletStore from "app/model/outlet";
import { onScroll, resetScrollState } from "app/utils/scrollEvent";
import { Image, LinierGradient, View } from "libs/ui";
import { statusBarHeight } from "libs/ui/Screen";
import { toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  RefreshControl,
  StatusBar,
  ToastAndroid,
  useWindowDimensions,
} from "react-native";
import Booking from "./Booking";
import Event from "./Event";
import Header from "./Header";
import Member from "./Member";
import News from "./News";
import Catalog from "./Catalog"
import SessionStore from "app/model/session";
import Socmed from "./Socmed";
import Facility from "./Facility";
import color from "app/config/color";

export default observer((props: any) => {
  const { scrollState } = props;
  const isFocused = useIsFocused();
  const meta = useLocalObservable(() => ({
    pressed: false,
    expand: false,
    redirect: false
  }));
  const dim = useWindowDimensions();
  const HEADER_MAX_HEIGHT = dim.width;
  const HEADER_MIN_HEIGHT = statusBarHeight + 100;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 20;


  const scrollY = useRef(
    new Animated.Value(Platform.OS === "ios" ? 0 : 0)
  ).current;

  const AnimscrollY = Animated.add(
    scrollY,
    Platform.OS === "ios" ? 0 : 0
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });
  const refresh = async () => {
    
      NewsStore.load();
      EventStore.load(0);
      BannerStore.load();
      MerchandiseStore.load();
      MembershipStore.loadPoin();
      MembershipStore.loadCountCoupon();
      SessionStore.loadFeatures()
    
    // OutletStore.load();
    
  };

  const scrollViewRef = useRef(null);

  const refreshControl = (
    <RefreshControl refreshing={MembershipStore.poinIsLoading} onRefresh={refresh} />
  );

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("light-content");
      resetScrollState(scrollState);
    }
  }, [isFocused]);

  useEffect(() => {
    refresh();
  }, []);


  // const _onMomentumScrollEnd = ({ nativeEvent }: any) => {
  //   const position = nativeEvent.contentOffset; 
  //   if(Platform.OS === "ios" && position.y<0){
  //     scrollViewRef.current?.scrollTo({y: (HEADER_MAX_HEIGHT/2) -60, animated: true});
  //   }
  // }

  return (
    <>
      <Animated.ScrollView
        refreshControl={refreshControl}
        style={{
          flex: 1
        }}
        ref={scrollViewRef}
        scrollEventThrottle={1}
        onContentSizeChange={() => {
          if (Platform.OS === "ios") {
            scrollViewRef.current?.scrollTo({ y: (HEADER_MAX_HEIGHT / 2) - 60, animated: false });
          }

        }}
        scrollEnabled={meta.redirect == false}
        nestedScrollEnabled={false}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }],
          {
            useNativeDriver: true,
            listener: (e) => {
              onScroll(e, scrollState);


              if (!meta.redirect) {
                if (Platform.OS === "android" && e.nativeEvent.contentOffset.y ==0) {
                  meta.redirect = true
                  scrollViewRef.current?.scrollTo({ y: 10});
                  if(!MembershipStore.poinIsLoading){
                    refresh();
                    ToastAndroid.show("Reloading...",ToastAndroid.SHORT);
                  }
                  
                }
                if (Platform.OS === "ios" && e.nativeEvent.contentOffset.y < 0) {
                  meta.redirect = true
                  scrollViewRef.current?.scrollTo({ y: (HEADER_MAX_HEIGHT / 2) - 100, animated: true });
                  if(!MembershipStore.poinIsLoading){
                    refresh();
                  }
                }
              } else {
                if (Platform.OS === "ios" && e.nativeEvent.contentOffset.y >= 0) {
                  meta.redirect = false
                }
                if (Platform.OS === "android" && e.nativeEvent.contentOffset.y >= 0) {
                  meta.redirect = false
                }

              }


            },
          }
        )}
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: (0 - HEADER_MAX_HEIGHT),
          x: 0,
        }}
        contentContainerStyle={{
          
        }}
      >
        <View
          style={{
            paddingTop: HEADER_MAX_HEIGHT,
            backgroundColor:"#fff",
            flex: 1
          }}
        >
          <View
            style={{
              width: dim.width,
              height: 20,
              position: "absolute",
              top: 0,
            }}
          />
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
            }}
          >
            {SessionStore.isLoggedIn &&
              <Member />
              }

            <Event />
            <Facility />
              <Socmed />
            
            {/* <News /> */}
          </View>
        </View>
      </Animated.ScrollView>
      <Header
        HEADER_MAX_HEIGHT={HEADER_MAX_HEIGHT}
        HEADER_MIN_HEIGHT={HEADER_MIN_HEIGHT}
        headerTranslate={headerTranslate}
        imageTranslate={imageTranslate}
      />
    </>
  );
});



