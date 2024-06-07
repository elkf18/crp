import OutletStore from "app/model/outlet";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Image, ScrollView, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { capitalizeFLetter } from "libs/utils/string-format";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
  Linking,
  Platform,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import MapView from "./MapView";

export default observer((props: any) => {
  const { meta } = props;
  const Theme = useTheme();
  const dim = useWindowDimensions();
  const item = OutletStore.selectedOutlet;

  const refresh = async () => {
    OutletStore.selectedOutlet.load();
  };

  const refreshControl = (
    <RefreshControl
      refreshing={OutletStore.selectedOutlet.loading}
      onRefresh={refresh}
    />
  );

  let statusEl;
  switch (item.status) {
    case "BUKA":
      statusEl = (
        <Text
          style={{
            fontFamily: Fonts.MontserratBold,
            fontSize: 10,
            color: "#fff",
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
            fontSize: 10,
            color: "#fff",
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
            fontSize: 10,
            color: "#fff",
          }}
        >
          TUTUP
        </Text>
      );
      break;
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView refreshControl={refreshControl}>
      <View
        style={{
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri: AppConfig.serverUrl + item.img_url,
            }}
            style={{
              width: (4 / 10) * dim.width,
              height: (1 / 2) * dim.width + 10,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              marginLeft: 10,
              flex: 1,
            }}
          >
            <MapView />
            <Button
              mode="clean"
              style={{
                margin: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
              }}
              onPress={() => {
                runInAction(() => (meta.visible = true));
              }}
              disabled={item.gallery.length === 0}
            >
              <Image
                source={{
                  uri: AppConfig.serverUrl + item.firstGallery,
                }}
                style={{
                  width: "100%",
                  height: (1 / 4) * dim.width,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexShrink: 1,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                marginVertical: 5,
                fontSize: 20,
                flexShrink: 1,
              }}
            >
              {item.nama}
            </Text>
            <View
              style={{
                backgroundColor: Theme.colors.primary,
                paddingHorizontal: 5,
                borderRadius: 99,
                marginLeft: 5,
                marginTop: 13,
              }}
            >
              {statusEl}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              paddingBottom: 20,
              borderColor: "#ccc",
              paddingHorizontal: 15,
            }}
          >
            <Button
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 99,
                flex: 1,
              }}
            >
              <Text>Website</Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 99,
                flex: 1,
              }}
              onPress={() => {
                const coordinate = {
                  latitude: item.latitude,
                  longitude: item.longitude,
                };
                let url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${coordinate.latitude},${coordinate.longitude}`;
                if (Platform.OS === "ios")
                  url = `http://maps.apple.com/?daddr=${coordinate.latitude},${coordinate.longitude}`;
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    Linking.openURL(url);
                    
                  }
                });
              }}
            >
              <Text>Peta</Text>
            </Button>
            <Button
              style={{
                backgroundColor: "#EFEFEF",
                borderRadius: 99,
                flex: 1,
              }}
              onPress={() => {
                let url = "tel:" + item.telpon;
                if (Platform.OS === "ios") {
                  url = "tel://" + item.telpon;
                }
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) {
                    Linking.openURL(url);
                  } else {
                    Linking.openURL(url);
                    // alert("Oops can't open phone.");
                  }
                });
              }}
            >
              <Text>Hubungi</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: Theme.fontStyle.bold,
              }}
            >
              Alamat:
            </Text>{" "}
            {item.alamat}, {item.kota}, {item.provinsi}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: Theme.fontStyle.bold,
              }}
            >
              No. Telfon:
            </Text>{" "}
            {item.telpon}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: Theme.fontStyle.bold,
              }}
            >
              Jam Buka:
            </Text>{" "}
            {item.open} - {item.close}
          </Text>
          {/* <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 12,
            }}
          >
            Jam Operasional
          </Text>
          {operasional.map((item, key) => {
            let time = OutletStore.selectedOutlet.getOperational(item.key);
            let active =
              item.key == dateFormat(new Date(), "EEE").toLowerCase();
            return (
              <View
                key={key}
                style={{
                  marginHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: active
                      ? Fonts.MontserratBold
                      : Fonts.MontserratRegular,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    fontFamily: active
                      ? Fonts.MontserratBold
                      : Fonts.MontserratRegular,
                  }}
                >
                  {time.open} - {time.close}
                </Text>
              </View>
            );
          })} */}
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {item.setting.map((it: any, key: number) => {
            return (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Icon
                  name={
                    it.value === "true"
                      ? "checkmark-circle-outline"
                      : "close-circle-outline"
                  }
                  color="#666"
                />
                <Text>{it.item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
});
