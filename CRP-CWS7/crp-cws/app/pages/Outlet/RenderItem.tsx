import Fonts from "libs/assets/fonts";
import { Button, Icon, Image, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import { observer } from "mobx-react-lite";
import React from "react";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";

export default observer((props: any) => {
  const { item } = props;
  const nav = useNavigation();
  const selected = OutletStore.currentOutlet;

  let statusEl = (
    <Text
      style={{
        fontFamily: Fonts.MontserratBold,
        fontSize: 12,
        color: "red",
      }}
    >
      TUTUP
    </Text>
  );

  switch (item.status) {
    case "BUKA":
      statusEl = (
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            fontSize: 12,
            color: "green",
          }}
        >
          BUKA
        </Text>
      );
      break;
    case "SEGERA BUKA":
      statusEl = (
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            fontSize: 12,
            color: "#333",
          }}
        >
          SEGERA BUKA
        </Text>
      );
      break;
    default:
      statusEl = (
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            fontSize: 12,
            color: "red",
          }}
        >
          TUTUP
        </Text>
      );
      break;
  }

  const goToDetail = () => {
    OutletStore.setSelectedtOutlet(item);
    nav.navigate("DetailOutlet");
  };

  return (
    <Button
      mode="clean"
      style={{
        borderRadius: 0,
        margin: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
      onPress={goToDetail}
    >
      <View
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Button
            style={{
              borderRadius: 99,
              margin: 0,
              paddingVertical: 5,
              paddingHorizontal: 20,
              alignSelf: "flex-start",
              backgroundColor:selected.id === item.id?"#fff":useTheme().colors.primary,
              borderColor:selected.id === item.id?useTheme().colors.primary:"#fff",
              borderWidth:selected.id === item.id?1:0,
            }}
            onPress={() => {
              if (selected.id !== item.id) {
                OutletStore.setCurrentOutlet(item);
              }
              nav.goBack();
            }}
            disabled={item.status === "TUTUP"}
          >
            <Text
              style={{
                color: selected.id === item.id?useTheme().colors.primary:"#fff",//Theme.colors.primary
              }}
            >
              {selected.id === item.id ? "Terpilih" : item.status === "TUTUP"?"Tutup" : "Pilih"}
            </Text>
          </Button>
          <View
            style={{
              flex:1,
              flexGrow:1,
            }}
          />

            {item.getDistance!==-1 &&
            <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              color: useTheme().colors.primary,//Theme.colors.primary
            }}
          >
            {item.getDistance} Km
          </Text>
            }
          
        </View>
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            marginVertical: 5,
          }}
        >
          {item.nama}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.alamat}, {item.kota}, {item.provinsi}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {item.open} - {item.close} | {item.telpon}
        </Text>
      </View>
      {!!item.img_url && (
        <Image
          source={{ uri: AppConfig.serverUrl + item.img_url }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
          }}
          resizeMode={"cover"}
        />
      )}
    </Button>
  );
});
