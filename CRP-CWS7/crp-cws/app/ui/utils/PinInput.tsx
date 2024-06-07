import color from "app/config/color";
import { View } from "libs/ui";
import { observer } from "mobx-react";
import React from "react";

export default observer((props: any) => {
  const { value, length } = props;
  const items = [];
  for (let i = 0; i < length; i++) {
    items.push(
      <View
        key={i}
        style={{
          borderWidth: 4,
          borderColor: "#364363",
          borderRadius: 4,
          height: 35,
          width: 35,
          backgroundColor: i + 1 <= value.length ? color.natural_100 : "#364363",
        }}
      />
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
      }}
    >
      {items}
    </View>
  );
});
