import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import EventStore from "app/model/event";
import NewsStore from "app/model/news";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Linking, Pressable, Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";


export default observer(() => {
  const Theme = useTheme();
  const nav = useNavigation();

  const facilities = [
    {
      label: "Executive Mushola",
      icon: require("app/assets/images/icon/fc_musholla.png"),
      link: "https://ciputraworldsurabaya.com/mall/facilities/"
    },
    {
      label: "Baby Stroller",
      icon: require("app/assets/images/icon/fc_stroller.png"),
      link: "https://ciputraworldsurabaya.com/mall/facilities/"
    },
    {
      label: "Wheelchair",
      icon: require("app/assets/images/icon/fc_wheelchair.png"),
      link: "https://ciputraworldsurabaya.com/mall/facilities/"
    },
    {
      label: "Baby’s Room",
      icon: require("app/assets/images/icon/fc_baby.png"),
      link: "https://ciputraworldsurabaya.com/mall/facilities/"
    },
    {
      label: "Charging Station",
      icon: require("app/assets/images/icon/fc_charge.png")
    }

  ]

  return (
    <View
      style={{
        marginBottom: 16,
        flex: 1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 15,
          alignItems: "center"
        }}>
        <Text
          style={{
            fontFamily: fontFamily.bold,
            marginTop: 15,
            textAlign: "center",
            color: color.natural_20,
            fontSize: fontSize.l,
          }}
        >
          Our Facility
        </Text>
        <View style={{
          flexGrow: 1
        }} />

      </View>

      <ScrollView
        horizontal={true}
        style={{
          flexGrow:1,
          paddingEnd: 8,
          paddingStart:4,
          marginTop:8

        }}
      >
        <View
          style={{
            flexDirection: "row",

          }}>
          {facilities.map((item) => {
            return <RenderItem key={item.id} item={item} />;
          })}
        </View>

      </ScrollView>


    </View>
  );
});

const RenderItem = observer((props: any) => {
  const { item } = props;

  return (
    <Button
    style={{
      width:100,
      height:100,
      backgroundColor:color.secondary_border,
      borderRadius:8,
      alignContent:"center",
      alignItems:"center",
      alignSelf:"center",
      paddingHorizontal:4,
      paddingVertical:16,
      marginHorizontal:8
    }}
    onPress={()=>{
      Linking.openURL(item.link).then();
  }}
    >
      <View
      style={{
        flexDirection:"column"
      }}>
      <Image
        source={item.icon}
        style={{
          width: 34,
          height: 34,
        }}
      />
      <Text
      style={{
        fontFamily:fontFamily.bold,
        fontSize:fontSize.s,
        textAlign:"center",
        color:color.primary_main,
        marginTop:10
      }}
      >
        {item.label}
      </Text>

      </View>
    </Button>

  );
});
