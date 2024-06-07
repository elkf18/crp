import Fonts from "libs/assets/fonts";
import { Image, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";
import GuestHeader from "../../ui/utils/GuestHeader";

export default observer((props: any) => {
  const dim = Dimensions.get("window");
  const { meta } = props;

  if (meta.visibleKeyboard) {
    return <GuestHeader visibleBack={false} />;
  }

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
      }}
    >
      
      {!meta.visibleKeyboard && (
        <>
          <View
            style={{
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#000",
                fontFamily: Fonts.GothamBold,
              }}
            >
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: "#000",
                fontFamily: Fonts.GothamBold,
              }}
            >
              para warga!
            </Text>
          </View>
          <Image
            source={require("app/assets/images/ilustrator.png")}
            style={{
              width: dim.width,
              height: dim.width / 2,
              marginBottom: 20,
            }}
          />
        </>
      )}
    </View>
  );
});
