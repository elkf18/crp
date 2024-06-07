import { useNavigation, useRoute } from "@react-navigation/native";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Image, ImageBackground, Screen, Spinner, Text, TopBar, View, WebView } from "libs/ui";
import get from "lodash.get";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const Theme = useTheme();
  const nav = useNavigation();
  const route = useRoute();
  const { data, onGoBack }: any = route.params || {};
  let zoom = 100;
  let source = data.source;
  let props = data.props || {};
  if (source.html) {
    source.html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 15px;">
          ${data.source.html}
        </body>
      </html>`;
  }
  const style = get(data, "style", {});

  return (
    <Screen>
      <TopBar
        style={{
          backgroundColor: "#fff",
        }}
        enableShadow={false}
        backButton={true}
        iconProps={{
          
            color: "#3a3a3a",
            name: "left",
            source: "AntDesign",
            size: 28,
          
        }}
        actionBackButton={() => {
          if (!!onGoBack) {
            onGoBack();
          } else {
            nav.goBack();
          }
        }}
      >
        <Text
          style={{
            color: Theme.colors.primary,
            fontSize: 20,
            fontFamily: Fonts.MontserratBold,
            flexGrow: 1,
          }}
        >
          {data.title}
        </Text>
      </TopBar>
      <ImageBackground
          source={require("app/assets/images/background-hand.png")}
          
          imageStyle={{
            resizeMode:"contain",
            height:400,
            width: "100%",
            position: 'absolute',
            top: undefined,
            bottom:0,
            
            alignSelf: "flex-end"
          }}
        >
            <WebView
                source={source}
                allowFileAccess={true}
                textZoom={zoom}
                style={{
                  flex: 1,
                  ...style,
                  backgroundColor:'transparent',
                  marginBottom:90
                }}
                loadingImage={require("app/assets/images/splash-jokopi.png")}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                javaScriptEnabled={true}
                sharedCookiesEnabled={true}
                renderLoading={() => {
                  return (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      // type={"View"}
                    >
                      <Image
                        source={require("app/assets/images/splash-jokopi.png")}
                        style={{
                          width: dim.width,
                          height: dim.width / 2,
                          marginBottom: 20,
                        }}
                      ></Image>
                      <Spinner
                        style={{
                          alignSelf: "center",
                        }}
                        color={Theme.colors.primary}
                      ></Spinner>
                    </View>
                  );
                }}
                {...props}
              />
          </ImageBackground>
      
    </Screen>
  );
});
