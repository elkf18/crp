import { useIsFocused, useNavigation } from "@react-navigation/native";
import HistoryStore from "app/model/history";
import SessionStore from "app/model/session";
import { AboutHtml, FAQHtml, TermsHtml } from "app/ui/account/content";
import TopBar from "app/ui/account/TopBar";
import { resetScrollState } from "app/utils/scrollEvent";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Image, ScrollView, Text, View } from "libs/ui";
import { action, runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect } from "react";
import { Dimensions, StatusBar, StyleSheet } from "react-native";
import codePushOptions from "libs/config/code-push";
import codePush from "react-native-code-push";
import { IIcon } from "libs/ui/Icon";
import Update from "./Update";
import { fontFamily, fontSize } from "app/config/const";
import color from "app/config/color";
import { FontDisplay } from "expo-font";
import { Alert } from "react-native";

export default observer((props: any) => {
  const { scrollState } = props;
  const isFocused = useIsFocused();
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();
  const session = SessionStore;
  let Image_User = { uri: AppConfig.serverUrl + SessionStore.user.foto };
  const cstyle = StyleSheet.flatten([
    {
      height: 120,
      width: "100%",
    },
  ]);


  const meta = useLocalObservable(() => ({
    update: false,
    checkUpdate: false,
    progress: "",
  }));
  SessionStore.loadSosmed()
  // SosmedStore.load();

  const handleUpdate = action(async () => {
    try {
      runInAction(() => (meta.checkUpdate = true));
      codePush
        .checkForUpdate(codePushOptions.deploymentKey)
        .then((update) => {
          if (!update) {
            alert("Already updated.");
            runInAction(() => (meta.checkUpdate = false));
          } else {
            runInAction(() => (meta.update = true));
            update
              .download((progress: any) => {
                if (!!progress) {
                  let dl = (progress.receivedBytes / progress.totalBytes) * 100;
                  let load = (progress.receivedBytes/1000000).toFixed(2)+ " MB / " +(progress.totalBytes/1000000).toFixed(2)+ " MB" + `(${dl.toFixed(1)}%)`;
                  runInAction(() => (meta.progress = "\n"+load));
                  if (dl == 100) {
                    runInAction(() => (meta.checkUpdate = false));
                    meta.checkUpdate = false;
                    codePush.allowRestart();
                    setTimeout(() => {
                      codePush.restartApp();
                    }, 100);
                  }
                }
              })
              .catch((e) => {
                runInAction(() => (meta.checkUpdate = false));
                console.log(e);
              });
          }
        })
        .catch((e) => {
          runInAction(() => (meta.checkUpdate = false));
          console.log(e);
        });
    } catch (e) {
      runInAction(() => (meta.checkUpdate = false));
      // handle or log error
      console.log(e);
    }
  });
  const Menu = [
    // {
    //   label: "Lokasi Outlet JOKOPI",

    //   icon: require("app/assets/images/icon-location.png"),
    //   action: () => nav.navigate("Outlet"),
    // },
    // {
    //   label: "Tentang JOKOPI",
    //   icon: require("app/assets/images/icon-info.png"),
    //   action: () =>
    //     nav.navigate("MediaWebView", {
    //       data: {
    //         title: "Tentang JOKOPI",
    //         source: {
    //           html: AboutHtml,
    //         },
    //       },
    //     }),
    // },
    {
      label: "Membership",
      icon: require("app/assets/images/icon/membership.png"),
      action: () =>//FaqView
        nav.navigate("MembershipView"),
      // nav.navigate("MediaWebView", {
      //   data: {
      //     title: "F.A.Q",
      //     source: {
      //       html: FAQHtml,
      //     },
      //   },
      // }),
    },
    {
      label: "FAQ",
      icon: require("app/assets/images/icon/faq.png"),
      action: () =>//FaqView
        nav.navigate("FaqView"),
      // nav.navigate("MediaWebView", {
      //   data: {
      //     title: "F.A.Q",
      //     source: {
      //       html: FAQHtml,
      //     },
      //   },
      // }),
    },
    {
      label: "Delete Account",
      icon: require("app/assets/images/icon/delete.png"),
      action: async () => {
        const alertDialogChoose = await new Promise((resolve) => {
          Alert.alert(
            "Hapus Akun",
            "Apakah Anda yakin mau menghapus akun?",
            [
              {
                text: "KEMBALI",
                onPress: () => {
                  resolve(false);
                },
              },
              {
                text: "OK",
                onPress: () => {
                  resolve(true);
                },
              },
            ]
          );
        })

        if(alertDialogChoose) {
          const res = await SessionStore.deleteAccount()
        
          if(res.msg === "Success") {
            SessionStore.logout()
          }
        }
      }
    }
    // {
    //   label: "Lapor",
    //   icon: require("app/assets/images/icon-faq.png"),
    //   action: () =>//FaqView
    //     nav.navigate("LaporView"),
    //   // nav.navigate("MediaWebView", {
    //   //   data: {
    //   //     title: "F.A.Q",
    //   //     source: {
    //   //       html: FAQHtml,
    //   //     },
    //   //   },
    //   // }),
    // },
    // {
    //   label: "Syarat & Ketentuan",
    //   icon: require("app/assets/images/icon-note.png"),
    //   action: () =>
    //     nav.navigate("MediaWebView", {
    //       data: {
    //         title: "Syarat & Ketentuan",
    //         source: {
    //           html: TermsHtml,
    //         },
    //       },
    //     }),
    // },
    // {
    //   label: "Check new update",
    //   action: handleUpdate,
    //   icon: {
    //     name: "system-update",
    //     source: "MaterialIcons",
    //     color:"#000"
    //   } as IIcon,
    // },
  ];

  useEffect(() => {
    if (isFocused) {
      resetScrollState(scrollState);
    }
  }, [isFocused]);




  return (
    <>
      <TopBar/>
      <ScrollView>
        <View
          style={{
            // padding: 15,
            paddingBottom: 50,
            backgroundColor:"#15213F"
          }}
        >
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Button
              mode="clean"
              // onPress={() => nav.navigate("Profile")}
              style={{
                borderRadius: 99,
                paddingHorizontal: 0,
                paddingVertical: 0,
                margin: 0,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: 120,
                  height: 120,
                  overflow: "hidden",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderRadius: 999,
                  borderColor: "#ffffff",
                }}
              >
                {!!SessionStore.user.foto ? (
                  <Image
                    source={Image_User}
                    resizeMode="cover"
                    style={cstyle}
                  />
                ) : (
                  <Icon name="person" size={60} color={"#ccc"} />
                )}
              </View>
            </Button>
            <Text
              style={{
                fontFamily: fontFamily.bold,
                color: color.natural_100,
                fontSize: fontSize.xl,
                textAlign: "center",
                flexGrow: 1,
                marginTop: 12,
              }}
            >
              {session.user.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                flexGrow: 1,
                marginBottom:24
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.reguler,
                  color: color.natural_100,
                  fontSize: fontSize.m,
                }}
              >
                {session.user.phone1}
              </Text>
            </View>
          </View>
          <View 
          style={{
            backgroundColor:"#fff", 
            paddingHorizontal:16,
            paddingTop:12,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height:"100%"
            }}>

            {Menu.map((item, key) => {
              return <RenderMenu key={key} item={item} />;
            })}
          <Button
            style={{
              backgroundColor: "#fff",
              borderColor:color.primary_main,
              borderWidth:1,
              borderRadius:4,
              paddingVertical: 12,
              margin: 0,
              marginTop: 15,
            }}
            onPress={() => SessionStore.logout()}
          >
            <Text
              style={{
                fontFamily: fontFamily.bold,
                color: color.primary_main,
                fontSize: fontSize.m
              }}
            >
              Logout
            </Text>
            <Image
                source={require("app/assets/images/icon/log-out-outline1.png")}
                style={{
                  height: 16,
                  width: 16,
                  marginLeft:10
                }}
              />
          </Button>

          {/* <Text
            style={{
              fontSize: 12,
              color: "#000",
              textAlign: "center",
              marginBottom: 40,
              marginTop: 10,
            }}
          >
            v{AppConfig.version}
          </Text> */}
          </View>

        </View>
      </ScrollView>
      <Update meta={meta} />
    </>
  );
});

const RenderMenu = observer((props: any) => {
  const { item } = props;
  return (
    <Button
      mode="clean"
      style={{
        margin: 0,
        marginBottom:15,
        paddingHorizontal: 0,
        justifyContent: "flex-start",
        borderColor: "#ccc",
        borderRadius: 0,
      }}
      onPress={item.action}
    >
      <Image
        source={item.icon}
        style={{
          height: 36,
          width: 36,
        }}
      />
      <Text
        style={{
          marginLeft: 16,
          paddingVertical: 8,
          fontSize:fontSize.m,
          flex: 1,
          fontFamily: fontFamily.medium,
          color:color.natural_20
          
        }}
      >
        {item.label}
      </Text>
      <Image
                source={require("app/assets/images/chevron-right-bold.png")}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
    </Button>
    
  );
});
