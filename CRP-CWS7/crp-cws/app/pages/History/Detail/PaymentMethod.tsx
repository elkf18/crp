import HistoryStore from "app/model/history";
import Fonts from "libs/assets/fonts";
import { Image, Text, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { useWindowDimensions } from "react-native";

export default observer(() => {
  const dim = useWindowDimensions();
  const item = HistoryStore.detail;
  const width = (dim.width - 50) / 2;
  if (!item.getPayment?.payment_method) return null;
  return (
    <View
      style={{
        borderTopWidth: 2,
        borderColor: "#ccc",
        padding: 15,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.MontserratBold,
          marginBottom: 15,
        }}
      >
        Metode Pembayaran
      </Text>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        {item.getPayment.payment_method.toUpperCase().includes("GOPAY") ? (
          <Image
            source={require("app/assets/images/gopay.png")}
            style={{
              width: width,
              height: (3 / 4) * width,
            }}
          />
        ) : item.getPayment.payment_method.toUpperCase().includes("OVO") ? (
          <Image
            source={require("app/assets/images/ovo.png")}
            style={{
              width: width,
              height: (3 / 4) * width,
            }}
          />
        ) : (
          <Image
            source={require("app/assets/images/cash.png")}
            style={{
              width: width,
              height: (3 / 4) * width,
            }}
          />
        )}
      </View>
    </View>
  );
});
