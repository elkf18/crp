import Fonts from "libs/assets/fonts";
import { Image, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const nav = useNavigation();
  const dim = Dimensions.get("window");

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: "#009B4D",
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.MontserratBold,
          marginBottom: 15,
          color: "#fff",
        }}
      >
        Your order is being prepared
      </Text>
      <Text
        style={{
          marginBottom: 15,
          fontSize: 12,
          color: "#fff",
        }}
      >
        Ordermu sedang di proses
      </Text>
      <Image
        source={require("app/assets/images/swipe.png")}
        style={{
          height: 50,
          width: dim.width - 40,
        }}
      />
    </View>
  );
});
