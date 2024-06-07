import { useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Text, TopBar,Image } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const Theme = useTheme();

  return (
    <TopBar
      enableShadow={false}
      style={{
        backgroundColor: "#15213F",
      }}
      // backButton
      customProps={{
        iconBackButton: {
          color: "#3a3a3a",
          name: "left",
          source: "AntDesign",
          size: 28,
        },
      }}
      rightAction={<RightAction />}
    >
      <Text
        style={{
          color: color.natural_100,
          fontSize: fontSize.xl,
          fontFamily: fontFamily.bold,
          flexGrow: 1,
          marginLeft:14
        }}
      >
        Profile
      </Text>
    </TopBar>
  );
});

const RightAction = () => {
  const nav = useNavigation();
  return (
    <Button
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
      onPress={() => nav.navigate("Profile")}
    >
<Image
                source={require("app/assets/images/icon/EditProfil.png")}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
    </Button>
  );
};
