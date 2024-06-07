import React from "react";
import { View, Button, Text } from "libs/ui";
import { observer } from "mobx-react-lite";
import useTheme from "libs/hooks/useTheme";

export default observer(({ state, tabs }: any) => {
  const Theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        overflow: "scroll",
        backgroundColor: Theme.colors.primary,
      }}
    >
      {tabs.map((item: any, key: number) => {
        return (
          <Button
            key={key}
            style={{
              minWidth: 60,
              flex: 1,
              paddingLeft: 5,
              paddingRight: 5,
              margin: 0,
              borderRadius: 0,
              alignItems: "center",
              position: "relative",
              backgroundColor:
                state.tab === item.value
                  ? Theme.colors.secondary
                  : "transparent",
            }}
            onPress={() => {
              state.tab = item.value;
            }}
            activeOpacity={0}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "400",
                fontSize: 12,
                flexWrap: "nowrap",
                flexDirection: "column",
                alignItems: "center",
              }}
              // numberOfLines={1}
              // ellipsizeMode={"tail"}
            >
              {item.label}
            </Text>
          </Button>
        );
      })}
    </View>
  );
});
