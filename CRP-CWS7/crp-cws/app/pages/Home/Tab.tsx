import { useTheme } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily } from "app/config/const";
import SessionStore from "app/model/session";
import { GuestRoutes, TabRoutes } from "app/routes/tabs";
import { ITheme } from "libs/config/theme";
import { IRoute } from "libs/routes";
import { Button, Icon, Image, Text, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, ViewStyle } from "react-native";
import { SvgCss } from "react-native-svg";

export default observer(({ state, navigation, tabRef, scrollState }: any) => {
  const animate = useRef(new Animated.Value(0)).current;
  const position = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });



  return (
    <>
      <View
        style={{
          backgroundColor: color.primary_main,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
          width: "100%",
          height: 60
        }}
      >
      </View>
      <Animated.View
        ref={tabRef}
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          elevation:99

          
        }}
      >
        <RenderMenu
          state={state}
          navigation={navigation}
          scrollState={scrollState}
        />
      </Animated.View>
    </>

  );
});

const RenderMenu = observer((props: any) => {
  const Theme: ITheme = useTheme() as any;
  const { state, navigation, scrollState } = props;
  const local = useLocalObservable(() => ({
    tabRoutes: TabRoutes
  }));

  useEffect(() => {

    if (SessionStore.isLoggedIn) {
      runInAction(()=>{
        local.tabRoutes = TabRoutes
      })
    } else {
      runInAction(()=>{
        local.tabRoutes = GuestRoutes
      })
    }
  }, [SessionStore.isLoggedIn])

  let baseStyle: ViewStyle = {
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingVertical: 8,
    flex: 1,
    borderRadius: 0,
    margin: 0,
    justifyContent: "flex-end",

  };

  return (
    <>
      {local.tabRoutes.map((item: IRoute, key: number) => {
        if (!item) return null;
        const active = state.routes[state.index].name === item.name;
        baseStyle = {
          ...baseStyle,
          marginHorizontal: (item.name === "QRCode" || item.name === "Login") ? 10 : 0,
        };
        const RenderIcon = () => {
          const icon: any = item.icon;
          const imageIcon: any = item.imageIcon;
          const svgIcon: any = item.svgIcon;
          let size = 50;
          let icStyle: any = {
            margin: 5,
          };
          if (item.name === "QRCode" || item.name === "Login") {
            size *= 1.25;
            icStyle = {
              ...icStyle,
              position: "absolute",
              bottom: 0,
              borderRadius: 999,
            };
          }
          if (!!imageIcon) {
            return (
              <Image
                source={active ? imageIcon.active : imageIcon.inActive}
                style={{
                  width: size,
                  height: size,
                  ...icStyle,
                }}
              />
            );
          } else if (!!svgIcon) {
            return (
              <SvgCss
                xml={svgIcon}
                width={24}
                height={24}
                fill={active ? color.secondary_main : "#fff"} />
            );
          }

          return null;
        };
        return (
          <Button
            key={String(key)}
            mode="clean"
            style={{
              ...StyleSheet.flatten([baseStyle]),
              height: (item.name === "QRCode" || item.name === "Login") ? 100 : undefined,
              alignSelf: "flex-end"
              // position:(item.name === "QRCode" || item.name === "Login") ? "absolute" : undefined,
              // left:(item.name === "QRCode" || item.name === "Login") ? "44%" : undefined,
              // bottom:(item.name === "QRCode" || item.name === "Login") ? 0 : undefined,
              

            }}
            onPress={() => {
              if (scrollState.direction === "down" || scrollState.offset > 0) {
                runInAction(() => {
                  scrollState.direction = "up";
                  scrollState.offset = 0;
                });
              }
              navigation.navigate(item.name);
            }}
          >
            <RenderIcon />
            <Text
              style={{
                marginTop: 2,
                fontSize: 10,
                fontFamily: fontFamily.reguler,
                color: active ? color.secondary_main : "#fff",
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </Button>
        );
      })}
    </>
  );
});
