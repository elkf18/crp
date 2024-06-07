import { Image, Screen, Spinner, Text, View } from "libs/ui";
import React from "react";
import { Dimensions } from "react-native";

export default (props: any) => {
  const dim = Dimensions.get("window");
  const sdim = Dimensions.get("screen");
  let message = props.syncMessage;
  let progress = "";
  if (!!props.progress) {
    let dl = (props.progress.receivedBytes / props.progress.totalBytes) * 100;
    progress = `(${dl.toFixed(1)}%)`;
  }

  return (
    <Screen
      statusBar={{
        backgroundColor: "#00000000",
        barStyle: "light-content",
      }}
    >
      <Image
        source={require("app/assets/images/splash.jpg")}
        style={{
          height: sdim.height,
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          padding: 15,
          marginVertical: 15,
        }}
      >
        
        {!!message && (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Spinner color={"#fff"}></Spinner>

            <Text
              style={{
                fontSize: 13,
                marginLeft: 10,
                color: "#fff",
              }}
            >
              {message}
              {progress}
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
};
