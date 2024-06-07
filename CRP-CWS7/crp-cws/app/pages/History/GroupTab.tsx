import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import { Button, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";

export default observer((props: any) => {
  const { refList, tabs, state, navigation } = props;

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyboardAvoidingProps={{
        style: {
          flexShrink: 0,
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        {tabs.map((item: any, key: number) => {
          const active = item.label === state.routeNames[state.index];
          return (
            <Button
              key={item.label}
              mode="clean"
              style={{
                margin: 0,
                borderRadius: 0,
                flexGrow: 1,
                minWidth: 120,
                alignItems: "center",
                borderBottomWidth: !!active ? 3 : 1,
                borderColor: !!active ? color.secondary_main : color.natural_50,
                paddingHorizontal: 15,
                paddingVertical: 15,
              }}
              onPress={() => {
                navigation.navigate(item.label);
              }}
            >
              <Text
                style={{
                  color: !!active ? color.secondary_main : color.natural_50,
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize:fontSize.m,
                  fontFamily:  !!active ? fontFamily.bold:fontFamily.reguler,
                }}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {item.label}
              </Text>
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
});
