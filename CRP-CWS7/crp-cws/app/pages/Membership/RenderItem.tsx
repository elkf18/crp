import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import NewsStore from "app/model/membership";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { moneyFormat } from "libs/utils/string-format";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";

export default observer((props: any) => {
  const { item } = props;
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const imgW = 100;
  const imgH = 100;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("DetailVoucher",{data:{id:item.id}});
        }}>
        <View style={{ flexDirection: 'column', margin: 15, backgroundColor: color.natural_100 }}>
          <View style={{
            flexDirection: "row",
            alignContent: 'center',
            alignItems: 'flex-start',
            flexGrow: 0,
          }}>
            <View >
              <Image
                source={{ uri: `${AppConfig.serverUrl + item.url_pic}` }}
                style={{
                  width: imgW,
                  height: imgH, borderRadius: 8
                }}
                resizeMode={"cover"} />
            </View>
            <View style={{ flexDirection: 'column', margin: 8, paddingVertical: 4 }}>
              <Text style={{ fontFamily: fontFamily.reguler, fontSize: fontSize.s, color: color.natural_50 }}>
                {/* Sisa {item.qty} Kuota */}
                {item.qty!=null?"Sisa "+item.qty+" Kuota":""}
                </Text>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.natural_20, }}>{item.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.secondary_main, }}>{moneyFormat(item.redeem_point)}</Text>
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.m, color: color.natural_20, }}>{" "}pts</Text>
              </View>

            </View>
          </View>

        </View>
      </TouchableOpacity>

    </View>
    // <Button
    //   shadow
    //   style={{
    //     marginVertical: 10,
    //     marginHorizontal: 8,
    //     backgroundColor: "#00000099",
    //     borderRadius: 12,
    //     overflow: "hidden",
    //     flexDirection: "column",
    //     paddingHorizontal: 0,
    //     paddingVertical: 0,
    //     alignItems: "flex-start",
    //     height:120
    //   }}
    //   onPress={() => {
    //     // NewsStore.detail.init(item);
    //     // nav.navigate("DetailNews");
    //   }}
    // >
    //   <Image
    //     source={{ uri: `${AppConfig.serverUrl + item.img_url}` }}
    //     style={{
    //       width: imgW,
    //       height:imgH,
    //     }}
    //     resizeMode={"cover"}
    //   />
    //   <View
    //   style={{
    //     position:"absolute",
    //     bottom:0,
    //     backgroundColor:"#00000099",
    //     width:"100%",
    //     height:"100%"
    //   }}>
    //     <View
    //     style={{
    //       flexGrow:1
    //     }}
    //     />
    //   <Text
    //     style={{
    //       fontFamily: fontFamily.medium,
    //       fontSize:fontSize.l,
    //       color: color.natural_100,
    //       paddingHorizontal: 10,
    //       paddingBottom:10
    //     }}
    //   >
    //     {String(item.title).toUpperCase()}
    //   </Text>
    //   </View>


    // </Button>
  );
});
