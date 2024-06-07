import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/news";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions, Linking } from "react-native";

export default observer((props: any) => {
  const { item } = props;
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const imgW = 197;
  const imgH = 120;

  const loadInBrowser = () => {
    if(!!item.url){
      if(!item.url.includes("https://")){
        item.url="https://"+item.url
      }
      Linking.openURL(item.url).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <Button
      shadow
      style={{
        marginVertical: 10,
        marginHorizontal: 8,
        backgroundColor: "#15213F99",
        borderRadius: 12,
        overflow: "hidden",
        flexDirection: "column",
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: "flex-start",
        height:120
      }}
      onPress={() => {
        loadInBrowser()
      }}
    >
      <Image
        source={{ uri: `${AppConfig.serverUrl + item.img_url}` }}
        style={{
          width: imgW,
          height:imgH,
        }}
        resizeMode={"cover"}
      />
      <View
      style={{
        position:"absolute",
        bottom:0,
        backgroundColor:"#00000099",
        width:"100%",
        height:"100%"
      }}>
        <View
        style={{
          flexGrow:1
        }}
        />
      <Text
        style={{
          fontFamily: fontFamily.medium,
          fontSize:fontSize.l,
          color: color.natural_100,
          paddingHorizontal: 10,
          paddingBottom:10
        }}
        lineBreakMode="tail"
        numberOfLines={2}
      >
        {String(item.title).toUpperCase()}
      </Text>
      </View>
      
      
    </Button>
  );
});
