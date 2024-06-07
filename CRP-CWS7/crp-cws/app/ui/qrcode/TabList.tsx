import { useTheme } from "@react-navigation/native";
import Fonts from "libs/assets/fonts";
import { ITheme } from "libs/config/theme";
import { Button, ScrollView, Text, View } from "libs/ui";
import TopBar from "app/ui/utils/TopBar";
import { observer } from "mobx-react";
import React from "react";
import Filter from "../utils/Filter";
import MainTopBar from "../utils/MainTopBar";

export default observer(({ state, tabs, navigation }: any) => {
  const Theme: ITheme = useTheme() as any;
  // switch (tabs[state.index].name) {
  //   case "Baru":
  //     filter = ActivityStore.filterBaru;
  //     break;
  //   case "Berjalan":
  //     filter = ActivityStore.filterBerjalan;
  //     break;
  //   case "Selesai":
  //     filter = ActivityStore.filterSelesai;
  //     break;
  // }

  return (
    <>
      <TopBar title={"QR Code"} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyboardAvoidingProps={{
          style: {
            flexShrink: 1,
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            margin: 8,
            alignContent:"center",
            alignItems:"center",
            alignSelf:"center",
            justifyContent:"center"
          }}
        >
          {tabs.map((item: any, key: number) => {
            return (
              <Button
                key={key}
                style={{
                  flex: 1,
                  flexGrow:1,
                  borderRadius: 24,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  alignItems: "center",
                  position: "relative",
                  borderColor:
                  tabs[state.index].name === item.name
                      ? "#F5F5F5"
                      : "#fff",
                  backgroundColor:
                    tabs[state.index].name === item.name
                      ? "#F5F5F5"
                      : "#fff",
                      borderWidth:2,
                      
                }}
                onPress={() => {
                  navigation.navigate(item.name);
                }}
              >
                <Text
                  style={{
                    color: tabs[state.index].name === item.name
                    ? "#000"
                    : "#0007",
                    fontWeight: "400",
                    fontSize: 13,
                    flexWrap: "nowrap",
                    flexDirection: "column",
                    alignItems: "center",
                    fontFamily:Fonts.MontserratBold,
                    paddingTop:2,
                    
                  }}
                  numberOfLines={2}
                  ellipsizeMode={"tail"}
                >
                  {item.name}
                </Text>
              </Button>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
});
