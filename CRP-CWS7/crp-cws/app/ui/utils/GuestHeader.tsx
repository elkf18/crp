import { Button, Icon, Image, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { statusBarHeight } from "libs/ui/Screen";
import color from "app/config/color";

export default (props: any) => {
  const { onBack, visibleBack } = props;
  const nav = useNavigation();
  return (
    <View
      style={{
        paddingTop: statusBarHeight + 5,
        flexDirection: "row",
        position: "relative",
        height: 120,
        alignItems: "flex-start",
      }}
    >
      {visibleBack !== false ? (
        <Button
          mode={"clean"}
          style={{
            zIndex: 99,
            borderRadius: 0,
          }}
          onPress={() => (!!onBack ? onBack() : nav.goBack())}
        >
          <Icon color={color.natural_100} name="chevron-left" source="Entypo" size={30} />
        </Button>
      ) : (
        <View style={{ height: 45 }} />
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
          position: "absolute",
          left: 0,
          right: 0,
          top: statusBarHeight + 5,
        }}
      >
        <Image
          source={require("app/assets/images/logo.png")}
          style={{
            width: 80,
            height: 50,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
};
