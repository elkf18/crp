import { useNavigation } from "@react-navigation/native";
import List from "app/pages/DetailNews/List";
import TopBar from "app/ui/utils/TopBar";
import { Screen } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff",
      }}
    >
      <TopBar label="Berita" />
      <List />
    </Screen>
  );
});
