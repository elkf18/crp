import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/membership";
import useTheme from "libs/hooks/useTheme";
import { ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Touchable, TouchableOpacity } from "react-native";


export default observer(() => {
  const Theme = useTheme();
  const nav = useNavigation();
  return (
    <View
      style={{
        marginBottom: 15,
        flex:1
      }}
    >
      <View
      style={{
        flexDirection:"row",
        marginHorizontal:15,
        alignItems:"center"
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
        Catalog
      </Text>
      <View style={{
        flexGrow:1
      }}/>
      <TouchableOpacity
      onPress={()=>{
        nav.navigate("MembershipView/Catalog")
      }}
      >
      <Text
        style={{
          fontFamily: fontFamily.medium,
          marginTop: 15,
          textAlign: "center",
          color: color.secondary_main,
          fontSize: fontSize.s,
        }}
      >
        Lihat Semua
      </Text>
      </TouchableOpacity>
      </View>
      
      <ScrollView
      horizontal={true}
      style={{
        paddingHorizontal:2,
        
      }}
      >

      </ScrollView>
      
      
    </View>
  );
});
