import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/news";
import AppConfig from "libs/config/app";
import { Button, Icon, Image, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions, Linking } from "react-native";
import { SvgCss } from "react-native-svg";
import pin from "../../assets/images/map-pin.svg";

export default observer((props: any) => {
  const { item } = props;
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const imgW = (dim.width/2)-20;
  const imgH = 100;

  return (
    <Button
      style={{
        marginVertical: 10,
        marginHorizontal: 16,
        margin:15,
        backgroundColor: "#0000",
        borderRadius:8,
        overflow: "hidden",
        flexDirection: "column",
        paddingHorizontal: 0,
        paddingVertical: 0,
        alignItems: "flex-start",
        height:100
      }}
      onPress={() => {
        if(!!item.url){
          Linking.openURL(item.url).then();
        }
        
      }}
    >
        <View
        style={{
            flexDirection:"row"
        }}
        >

    <Image
        source={{ uri: `${AppConfig.serverUrl + item.img_url}` }}
        style={{
          width: imgW,
          height:100,
          borderRadius:8
        }}
        resizeMode={"cover"}
      />
      <View
      style={{
        
      }}>
        <Text
            style={{
              fontFamily: fontFamily.reguler,
              paddingHorizontal: 10,
              fontSize:fontSize.s,
              color:color.natural_20

            }}
          >
            {dateFormat(
              item.created_date,
              "d MMMM yyyy",
              "id"
            )}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.medium,
          fontSize:fontSize.m,
          color: color.natural_20,
          marginTop:4,
          paddingHorizontal: 10,
        }}
      >
        {String(item.title).toUpperCase()}
      </Text>

      <Text
            style={{
              fontFamily: fontFamily.reguler,
              paddingHorizontal: 10,
              fontSize:fontSize.s,
              color:color.natural_20,
              marginTop:4,
              textAlignVertical:"center",
              alignContent:'center',
              alignItems:"center"

            }}
          >
            <SvgCss 
              xml={pin.toString()} 
              width={12} 
              height={12}
              style={{
                marginEnd:4
              }}
              fill={color.natural_50}/>
            {"  "}{item.location}
      </Text>

      <Text
            style={{
              fontFamily: fontFamily.reguler,
              paddingHorizontal: 10,
              fontSize:fontSize.s,
              marginTop:4,
              color:color.secondary_main,
              textAlignVertical:"center",
              alignContent:'center',
              alignItems:"center"

            }}
          >
            <Icon
            name="call"
            source="Ionicons"
            size={12}
            color={color.natural_20}
            />
            {"  "}{item.contact_person_phone}
      </Text>
      </View>
        </View>
      
      
      
      
    </Button>
  );
});
