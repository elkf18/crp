import { Image, Text, TopBar } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";

export default observer(() => {
  return (
    <TopBar
      style={{
        backgroundColor: "#fff",
        flexDirection: "column",
      }}
    >
      <Image
        source={require("app/assets/images/smallLogo.png")}
        style={{
          width: 20,
          height: 40,
        }}
      ></Image>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          color: "#493932",
        }}
      >
        jo.ko.pi
      </Text>
    </TopBar>
  );
});
