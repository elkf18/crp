import color from "app/config/color";
import { fontFamily } from "app/config/const";
import Fonts from "libs/assets/fonts";
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
          marginTop:15,
          borderRadius:10,
          flexDirection: "row",
          padding: 5,
          flex: 1,
          marginHorizontal: 16,
          backgroundColor:color.natural_90,
        }}
      >
        {tabs.map((item: any, key: number) => {
          const active = item.value === state.routeNames[state.index];
          return (
            <Button
              key={key}
              mode="clean"
              style={{
                margin: 0,
                borderRadius: 10,
                flex: 1,
                width: 50,
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: !!active ? color.primary_main : color.natural_90 ,
              }}
              onPress={() => {
                navigation.navigate(item.value);
              }}
            >
              <Text
                style={{
                  // color: !!active ? "#3a3a3a" : "#ccc",
                  color:color.secondary_main,
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: fontFamily.bold,
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
