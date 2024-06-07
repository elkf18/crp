import { useIsFocused, useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import OrderStore from "app/model/order";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, LinierGradient, Text, View } from "libs/ui";
import { moneyFormat } from "libs/utils/string-format";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import { SvgCss } from "react-native-svg";
import pin from "../../assets/images/map-pin.svg";

export default observer((props: any) => {
  const { item,key } = props;
  
  
  const dim = Dimensions.get("window");
  

  return (
    <View
    key={key}
      style={{
        width: dim.width / 2,
        height: dim.width / 2,
      }}>
      <Button
        mode="clean"

        style={{
          margin: 8,
          borderRadius: 0,
          justifyContent: "center",
          paddingVertical: 0,

        }}
        disabled={true}
        disableOpacity={1}
      >
        <View
        style={{
          height: (dim.width / 2) - 20,
          width: (dim.width / 2) - 20,
          borderRadius: 8,
        }}>
          <Image
            source={require("app/assets/images/splash.jpg")}
            style={{
              height: (dim.width / 2) - 20,
              width: (dim.width / 2) - 20,
              borderRadius: 8,
              position:"absolute",
              top:0
            }}
            resizeMode={"cover"}

          />
          <Image
              source={{
                uri: AppConfig.serverUrl + item.img_url,
              }}
              style={{
                height: (dim.width / 2) - 20,
                width: (dim.width / 2) - 20,
                borderRadius: 8,
                position:"absolute",
                top:0,
              }}
              resizeMode={"cover"}
            />
        </View>
        {/* {!!item.img_url && item.img_url != "" ?
          <Image
            source={{
              uri: AppConfig.serverUrl + item.img_url,
            }}
            onLoad={()=>{
              return <Image
              source={require("app/assets/images/splash.jpg")}
              style={{
                height: (dim.width / 2) - 20,
                width: (dim.width / 2) - 20,
                borderRadius: 8,
              }}
              resizeMode={"cover"}
  
            />
            }}
            
            onError={()=>{
              return <Image
              source={require("app/assets/images/splash.jpg")}
              style={{
                height: (dim.width / 2) - 20,
                width: (dim.width / 2) - 20,
                borderRadius: 8,
              }}
              resizeMode={"cover"}
  
            />
            }}
            //source={require("app/assets/images/splash.jpg")}
            style={{
              height: (dim.width / 2) - 20,
              width: (dim.width / 2) - 20,
              borderRadius: 8,
            }}
            resizeMode={"cover"}

          />
          :
          <Image
            source={require("app/assets/images/splash.jpg")}
            style={{
              height: (dim.width / 2) - 20,
              width: (dim.width / 2) - 20,
              borderRadius: 8,
            }}
            resizeMode={"cover"}

          />
        } */}

        <View
          style={{
            position: "absolute",
            height: (dim.width / 2) - 20,
            width: (dim.width / 2) - 20,
          }}
        >
          <LinierGradient
            colors={
              [
                '#00000000',
                '#000000ff'
              ]}
            style={{

              borderRadius: 8,
              padding: 8,
              height: (dim.width / 2) - 20,
              width: (dim.width / 2) - 20,
            }}
          >
            <View style={{ flexGrow: 1 }} />
            <Text
              style={{
                color: color.natural_100,
                fontFamily: fontFamily.medium,
                fontSize: fontSize.m,
              }}

              numberOfLines={2}
            >
              {item.nama}
            </Text>
            <Text
              style={{
                color: color.natural_100,
                fontFamily: fontFamily.reguler,
                fontSize: fontSize.s,
                textAlignVertical: "center",
                alignContent: 'center',
                alignItems: "center"
              }}
              numberOfLines={2}
            >
              <SvgCss
                xml={pin.toString()}
                width={12}
                height={12}
                style={{
                  marginEnd: 4
                }}

                fill={color.natural_100} />
              {/* <Pin /> */}
              {"  "}{item.alamat}

            </Text>
          </LinierGradient>
        </View>
      </Button>
    </View>

  );
});
