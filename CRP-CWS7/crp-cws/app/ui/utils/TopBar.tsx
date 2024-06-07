import { useNavigation } from "@react-navigation/core";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import Fonts from "libs/assets/fonts";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Text, TopBar, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";
import { Dimensions } from "react-native";

export default observer((props: any) => {
  const { title, backgroundColor, rightActionColor, onGoBack, hiddenBack, textColor } = props;
  const dim = Dimensions.get("window");
  const Theme = useTheme();
  const nav = useNavigation();

  return (
    <TopBar
      enableShadow={false}
      style={{
        backgroundColor:  backgroundColor||color.primary_main,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
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
            <Icon name="chevron-back" color={rightActionColor||color.natural_100} size={30} />
          </Button>
        )}
        <Text
          style={{
            color: textColor||color.natural_100,
            fontSize: fontSize.xl,
            fontFamily: fontFamily.bold,
            flexGrow: 1,
            paddingLeft: !hiddenBack ? 45 : 20
          }}
        >
          {title || ""}
        </Text>
      </View>
    </TopBar>
  );
});
