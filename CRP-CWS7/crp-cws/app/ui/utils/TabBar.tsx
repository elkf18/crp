import { useIsFocused, useNavigation } from "@react-navigation/native";
import GlobalStore from "app/model/global";
import { TabRoutes } from "app/routes/tabs";
import { Button, Image, View } from "libs/ui";
import { action } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, ViewStyle } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const navigation = useNavigation();
  const focused = useIsFocused();
  const state = navigation.dangerouslyGetState();
  let baseStyle: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    margin: 0,
    height: 60,
    paddingHorizontal: 0,
    flexGrow: 1,
  };

  // useEffect(() => {
  //   let currentMenu = GlobalStore._json.activeMenu;
  //   if (state.index > -1) {
  //     let activeRoute = state.routes[state.index];
  //     currentMenu = TabRoutes.find((x) => x.name === activeRoute.name);
  //   }
  //   if (!!currentMenu) {
  //     GlobalStore._loadJSON({
  //       activeMenu: currentMenu,
  //     });
  //   }
  // }, [focused]);

  return (
    <View
      shadow
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        height: 60,
      }}
    >
      {TabRoutes.map((item: any, key: number) => {
        const active = GlobalStore.activeMenu.path === item.path;

        if (item.path === "QRCode") {
          return (
            <View key={String(key)} style={baseStyle}>
              <View
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 0,
                  alignItems: "center",
                  right: 0,
                }}
              >
                <Button
                  mode="clean"
                  style={{
                    borderRadius: 99,
                    padding: 0,
                    paddingHorizontal: 0,
                    height: 60,
                    width: 60,
                  }}
                  onPress={() => nav.navigate("QRCode")}
                >
                  <Image
                    source={item.icon}
                    style={{
                      height: 60,
                      width: 60,
                    }}
                  />
                </Button>
              </View>
            </View>
          );
        }

        return (
          <Button
            key={String(key)}
            mode="clean"
            style={baseStyle}
            onPress={action(() => {
              navigation.navigate(item.path);
              let data = {
                activeMenu: item,
              };
              GlobalStore._loadJSON(data);
            })}
          >
            <Image
              source={!!active ? item.icon.active : item.icon.inactive}
              style={{
                height: 35,
                width: 35,
              }}
            />
          </Button>
        );
      })}
    </View>
  );
});
