import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Text, TopBar, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer((props: any) => {
  const { title, onGoBack, hiddenBack } = props;
  const dim = Dimensions.get("window");
  const Theme = useTheme();
  const nav = useNavigation();

  return (
    <TopBar
      enableShadow={false}
      style={{
        backgroundColor: color.primary_main,
      }}
    >
      <View
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          // flexDirection: "row",
          marginLeft:10
        }}
      >
        {!hiddenBack && (
          <Button
            mode="clean"
            style={{
              borderRadius: 0,
              paddingHorizontal: 10,
              margin: 0,
              position: "absolute",
              left: 0,
              zIndex: 9,
            }}
            onPress={() => {
              if (!!onGoBack) {
                onGoBack();
              } else {
                nav.goBack();
              }
            }}
          >
            <Icon name="chevron-back" color="#333" size={30} />
          </Button>
        )}
        <Text
          style={{
            color: color.natural_100,
            fontSize: 20,
            fontFamily: Fonts.MontserratBold,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          {title || ""}
        </Text>
      </View>
    </TopBar>
  );
});
