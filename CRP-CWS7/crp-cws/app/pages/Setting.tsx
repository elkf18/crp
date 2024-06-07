import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import * as Application from "expo-application";
import codePushOptions from "libs/config/code-push";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Screen, ScrollView, Text, TopBar, View } from "libs/ui";
import { IIcon } from "libs/ui/Icon";
import { action } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React from "react";
import codePush from "react-native-code-push";
import Update from "../ui/setting/Update";

export default observer(() => {
  const nav = useNavigation();
  const Theme = useTheme();
  const meta = useLocalObservable(() => ({
    update: false,
    checkUpdate: false,
    progress: "",
  }));
  const handleUpdate = action(async () => {
    try {
      meta.checkUpdate = true;
      codePush.checkForUpdate(codePushOptions.deploymentKey).then((update) => {
        if (!update) {
          alert("Already updated.");
          meta.checkUpdate = false;
        } else {
          meta.update = true;
          update.download((progress: any) => {
            if (!!progress) {
              let dl = (progress.receivedBytes / progress.totalBytes) * 100;
              meta.progress = `(${dl.toFixed(1)}%)`;
              if (dl == 100) {
                meta.checkUpdate = false;
                setTimeout(() => {
                  codePush.restartApp();
                }, 100);
              }
            }
          });
        }
      });
    } catch (e) {
      meta.checkUpdate = false;
      // handle or log error
      //console.log(e);
    }
  });
  const menu = [
    {
      label: "Check new update",
      action: handleUpdate,
      icon: {
        name: "system-update",
        source: "MaterialIcons",
      } as IIcon,
    },
    {
      label: "Keluar",
      action: () => SessionStore.logout(),
      icon: {
        source: "AntDesign",
        name: "logout",
        size: 18,
      } as IIcon,
    },
  ];
  return (
    <Screen
      statusBar={{
        backgroundColor: Theme.colors.primary,
        barStyle: "light-content",
      }}
    >
      <TopBar backButton>Setting</TopBar>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          padding: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {menu.map((item, key) => {
            return (
              <Button
                key={key}
                mode={"clean"}
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 0,
                  justifyContent: "flex-start",
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                }}
                onPress={item.action}
              >
                <Icon
                  size={20}
                  color={Theme.colors.primary}
                  {...item.icon}
                ></Icon>
                <Text
                  style={{
                    marginLeft: 10,
                  }}
                >
                  {item.label}
                </Text>
              </Button>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {"©"} {Application.applicationName}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            v{Application.nativeApplicationVersion}
          </Text>
        </View>
      </ScrollView>
      <Update meta={meta} />
    </Screen>
  );
});
