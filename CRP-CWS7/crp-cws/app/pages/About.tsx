import { useNavigation } from "@react-navigation/native";
import TopBar from "app/ui/utils/TopBar";
import { Screen, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#00000000",
      }}
    >
      <TopBar label={"Tentang JOKOPI"} />
      <ScrollView>
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              marginBottom: 15,
              flex: 1,
            }}
          >
            Jokopi lahir dari pemikiran sederhana untuk mempertahankan tradisi berkumpul bersama teman-teman sebaya
          </Text>
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            Jokopi berupaya menjadi sebuah wadah untuk menginspirasi, bercerita, dan membangun budaya melalui sebuah medium komoditas universal yaitu kopi.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
});
