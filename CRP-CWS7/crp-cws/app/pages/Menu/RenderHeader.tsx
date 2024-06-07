import useTheme from "libs/hooks/useTheme";
import { Text, View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";

export default observer((props: any) => {
  const { section } = props;
  const Theme = useTheme();

  if (!section) return null;

  return (
    <View
      style={{
        marginBottom: 10,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 5,
        }}
      >
        <Text
          style={{
            fontFamily: Theme.fontStyle.bold,
          }}
        >
          {section.category}
        </Text>
      </View>
      {section.data.length === 0 && (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#aaa",
            }}
          >
            No item to display.
          </Text>
        </View>
      )}
    </View>
  );
});
