import { useIsFocused, useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import TopBar from "app/ui/utils/TopBar";
import { Screen } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Detail from "./Detail";
import ImageSlider from "./ImageSlider";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const meta = useLocalObservable(() => ({
    visible: false,
  }));

  // let interval: any;

  // useEffect(() => {
  //   if (isFocused) {
  //     interval = setInterval(() => {
  //       OutletStore.selectedOutlet.load();
  //     }, 5000);
  //   } else {
  //     if (!!interval) {
  //       clearInterval(interval);
  //     }
  //   }
  // }, [isFocused]);

  return (
    <Screen
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff4",
      }}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <TopBar title="Informasi Kedai" />
      <Detail meta={meta} />
      <ImageSlider state={meta} />
      {/* <Button
        style={{
          backgroundColor: "red",
          margin: 10,
        }}
        onPress={() => OutletStore.setCurrentOutlet(OutletStore.selectedOutlet)}
        disabled={
          OutletStore.selectedOutlet.id === OutletStore.currentOutlet.id
        }
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: Fonts.MontserratBold,
            paddingVertical: 5,
          }}
        >
          PILIH LOKASI INI
        </Text>
        {OutletStore.selectedOutlet.id === OutletStore.currentOutlet.id && (
          <Icon name="md-checkmark" size={24} color="#fff" />
        )}
      </Button> */}
    </Screen>
  );
});
