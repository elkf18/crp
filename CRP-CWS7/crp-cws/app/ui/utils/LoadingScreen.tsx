import { Image, Screen, ScrollView, Spinner, TopBar, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";

export default observer(({ title, actionBackButton }: any) => {
  const dim = Dimensions.get("window");

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
    >
      <TopBar backButton actionBackButton={actionBackButton}>
        {title}
      </TopBar>
      <ScrollView>
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          type={"View"}
        >
          <Image
            source={require("app/assets/images/splash-jokopi.png")}
            style={{
              width: dim.width,
              height: dim.width / 2,
              marginBottom: 30,
            }}
          ></Image>
          <Spinner></Spinner>
        </View>
      </ScrollView>
    </Screen>
  );
});
