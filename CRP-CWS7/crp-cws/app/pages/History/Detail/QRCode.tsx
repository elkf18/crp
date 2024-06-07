import HistoryStore from "app/model/history";
import AppConfig from "libs/config/app";
import { Image, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { useWindowDimensions } from "react-native";

export default observer(() => {
  const dim = useWindowDimensions();
  const item = HistoryStore.detail;
  const width = (dim.width - 50) / 2;

  if (!item.qr_code || !(item.status === "paid" || item.status === "complete"))
    return null;

  return (
    <View
      style={{
        borderTopWidth: 2,
        borderColor: "#ccc",
        padding: 15,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Image
          source={{
            uri: AppConfig.serverUrl + item.qr_code,
          }}
          style={{
            width: width,
            height: (3 / 4) * width,
          }}
          enablePreview
        />
      </View>
    </View>
  );
});
