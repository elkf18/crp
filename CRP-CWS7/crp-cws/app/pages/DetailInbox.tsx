import { useNavigation } from "@react-navigation/native";
import NotificationStore from "app/model/notification";
import OrderStore from "app/model/order";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import { Button, Image, Screen, ScrollView, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  useEffect(() => {
    return () => {
      OrderStore.initProductOrder();
    };
  }, []);

  return (
    <Screen
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff4",
      }}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <TopBar title="Detil Pesan" />
      <ScrollView>
        <View
          style={{
            padding: 15,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 16,
            }}
          >
            {NotificationStore.detail.data.title}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#aaa",
            }}
          >
            {dateFormat(
              NotificationStore.detail.data.created_date,
              "EEEE, d MMM yyyy - HH.mm",
              "id"
            )}
          </Text>
          <Image
            source={require("app/assets/images/hand.png")}
            style={{
              height: dim.width / 2,
              width: "100%",
              marginBottom: 20,
            }}
          />
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {NotificationStore.detail.data.description}
          </Text>
        </View>
      </ScrollView>
      <Button
        style={{
          paddingVertical: 10,
          margin: 15,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: Fonts.MontserratBold,
          }}
        >
          PESAN SEKARANG
        </Text>
      </Button>
    </Screen>
  );
});
