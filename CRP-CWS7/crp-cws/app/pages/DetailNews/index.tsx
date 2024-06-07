import { useNavigation } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/news";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Image, Screen, ScrollView, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React,  { useEffect, useState } from "react";
import { Linking, useWindowDimensions } from "react-native";

export default observer(() => {
  const Theme = useTheme();
  const dim = useWindowDimensions();
  const item = NewsStore.detail;
  const nav = useNavigation();
  const loadInBrowser = () => {
    if(!item.link_url.includes("https://")){
      item.link_url="https://"+item.link_url
    }
    Linking.openURL(item.link_url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Screen
      statusBar={{
        barStyle: "light-content",
      }}
    >
      <View>
        <Image
          source={{
            uri: AppConfig.serverUrl + item.img_url,
          }}
          style={{
            height: 200,
            width: dim.width,
          }}
          resizeMode="cover"
        />
        <Button
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            // borderRadius: 99,
            backgroundColor: color.primary_surface+"66",
            paddingHorizontal: 5,
            height: 45,
            width: 45,
          }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <Icon
            name="chevron-back"
            size={30}
            color="#000"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          />
        </Button>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}
        >
           <Text
            style={{
              fontFamily: fontFamily.reguler,
              marginTop: 15,
              lineHeight: 24,
              color:color.natural_20,
              fontSize:fontSize.s,

            }}
          >
            {dateFormat(
              item.created_date,
              // "EEEE, d MMMM yyyy - HH.mm",
              "d MMMM yyyy",
              "id"
            )}
          </Text>

          <Text
            style={{
              fontSize: fontSize.l,
              fontFamily: fontFamily.medium,
              color:color.natural_20,
              lineHeight: 24,
              marginBottom:10
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: fontFamily.reguler,
              fontSize: 14
            }}
          >
            {item.description}
          </Text>

          {!!item.link_url&&
          <Button
          style={{
            backgroundColor: "#fff0",
            padding:0,
            marginLeft:0
          }}
          onPress={() => {
            loadInBrowser()
          }}
          >
            <Text
            style={{
              flex:1,
              flexShrink:1,
              flexWrap:"wrap",
              color:color.secondary_main,
            }}
            >
              Lihat Sumber <Icon
            name="open-outline"
            size={18}
            color={color.secondary_main}
            style={{
              shadowColor: color.natural_10,
              letterSpacing:15,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          />
            </Text>
          </Button>
          }
          

          
        </View>
      </ScrollView>
    </Screen>
  );
});
