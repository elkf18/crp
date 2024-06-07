import Fonts from "libs/assets/fonts";
import { Button, ImageBackground, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { useNavigation } from "@react-navigation/native";
import SessionStore from "app/model/session";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  let names = SessionStore.user.name.split(" ");

  return (
    <Button
      onPress={() => nav.navigate("Profile")}
      mode="clean"
      style={{
        width: dim.width - 40,
        height: ((dim.width - 40) * 350) / 1368,
        overflow: "hidden",
        marginBottom: 15,
      }}
    >
      <ImageBackground
        source={require("app/assets/images/member.png")}
        style={{
          width: dim.width - 40,
          height: ((dim.width - 40) * 350) / 1368,
          padding: 5,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.GothamMedium,
              color: "#333",
              lineHeight: 16,
            }}
          >
            Halo, {names[0] || ""}!
          </Text>
          <Text
            style={{
              fontFamily: Fonts.MontserratExtraBold,
              fontSize: 10,
              color: "#AC9488",
            }}
          >
            80 gelas Jokopi
          </Text>
          <Text
            style={{
              fontSize: 8,
            }}
          >
            telah kamu pesan di bulan {dateFormat(new Date(), "MMMM")}
          </Text>
          <Text
            style={{
              fontSize: 8,
            }}
          >
            untuk menemani ceritamu.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 6,
            }}
          >
            Status
          </Text>
          <Text
            style={{
              fontFamily: Fonts.MontserratExtraBold,
              fontSize: 10,
              color: "#AC9488",
            }}
          >
            JURAGAN
          </Text>
        </View>
      </ImageBackground>
    </Button>
  );
});
