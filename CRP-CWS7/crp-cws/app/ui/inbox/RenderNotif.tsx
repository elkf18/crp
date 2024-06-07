import Fonts from "libs/assets/fonts";
import { Button, Icon, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import NotificationStore, { Data, Notification } from "app/model/notification";
import { runInAction } from "mobx";
import NewsStore from "app/model/news";
import HistoryStore from "app/model/history";
import { fontFamily, fontSize } from "app/config/const";
import color from "app/config/color";

export default observer((props: any) => {
  const item: Notification = props.item;
  const nav = useNavigation();

  const goToDetail = () => {
    if (!item.isRead) {
      runInAction(() => (item.isRead = true));
    }
    switch (item.data.type) {
      case "News":
        NewsStore.detail.init(item.data._json);
        nav.navigate("DetailNews");
        break;
      case "Events":
        nav.navigate("Informasi",{data:{index:0}});
        break;
      case "Lucky Draw":
        nav.navigate("MembershipView/Winner",{data:{...item._json}});
        break;
        case "Catalog":
          nav.navigate("Home");
          nav.navigate("History");
          break;


      // default:
      //   NotificationStore.detail.init(item.data._json);
      //   nav.navigate("DetailInbox");
      //   break;
    }
  };

  return (
    <Button
      mode="clean"
      shadow
      style={{
        borderRadius: 8,
        margin: 0,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: color.natural_100,
        marginHorizontal: 16,
        marginVertical: 8,

      }}
      onPress={goToDetail}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row"
          }}>
          {!item.isRead && (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: 99,
                marginTop: 7,
                marginRight: 5,
              }}
            />
          )}
          <Text
            style={{
              fontFamily: fontFamily.bold,
              fontSize: fontSize.m,
              color: color.natural_20
            }}
          >
            {item.data.type}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: fontFamily.reguler,
            fontSize: fontSize.m,
            color: color.natural_20

          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.type=="Lucky Draw"?"Congratulation! You are lucky draw winner":item.data.title}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.reguler,
            fontSize: fontSize.m,
            color: color.natural_50
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.description}
        </Text>
      </View>
    </Button>
  );
});
