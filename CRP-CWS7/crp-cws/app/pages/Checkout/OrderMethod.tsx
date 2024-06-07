import Fonts from "libs/assets/fonts";
import { Button, ChoiceGroup, DateTime, Image, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import { observer } from "mobx-react-lite";
import React from "react";
import useTheme from "libs/hooks/useTheme";
import { dateFormat } from "libs/utils/date";
import AppConfig from "libs/config/app";
import OrderStore from "app/model/order";

export default observer(() => {
  const nav = useNavigation();
  const Theme = useTheme();
  var maxTime = new Date();
  maxTime.setHours(parseInt(OutletStore.currentOutlet.closeHour));
  maxTime.setMinutes(parseInt(OutletStore.currentOutlet.closeMinute));
  maxTime.setMilliseconds(0);

  return (
    <>
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          backgroundColor: "#efefef",
          borderRadius: 99,
          overflow: "hidden",
          marginBottom: 10,
          marginHorizontal: 20,
        }}
      >
        <Button
          style={{
            margin: 0,
            flex: 1,
            backgroundColor: Theme.colors.primary,
            borderRadius: 99,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
              fontFamily: Fonts.MontserratBold,
            }}
          >
            Ambil sendiri
          </Text>
        </Button>
        <Button
          style={{
            margin: 0,
            flex: 1,
            backgroundColor: "transparent",
            borderRadius: 99,
          }}
        >
          <Text
            style={{
              color: "#aaa",
              fontSize: 10,
              fontFamily: Fonts.MontserratBold,
            }}
          >
            Pesan antar
          </Text>
        </Button>
      </View>
      <View
        style={{
          marginBottom: 15,
          paddingHorizontal: 20,
        }}
      >
        <ChoiceGroup
          style={{
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
          value={OrderStore.currentOrder.pickMode}
          onChange={(value: any) => {
            OrderStore.currentOrder.setPickMode(value.selected);
          }}
          items={[
            {
              label: "Sekarang",
              value: "Now",
            },
            {
              label: "Atur Waktu",
              value: "Time",
            },
          ]}
          labelPath="label"
          valuePath="value"
        />

        {OrderStore.currentOrder.pickMode === "Time" && (
          <DateTime
            type="time"
            maximumDate={maxTime}
            value={OrderStore.currentOrder.delivery_date}
            onChangeValue={(value) => {
              OrderStore.currentOrder.setTime(value);
            }}
            iconProps={{
              name: "md-time",
            }}
            styles={{
              label: {
                fontFamily: Fonts.MontserratBold,
                fontSize: 18,
                flexGrow: 0,
                marginRight: 10,
                paddingVertical: 5,
              },
            }}
            Label={({ value }: any) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ddd",
                      borderRadius: 4,
                      paddingHorizontal: 15,
                      marginRight: 5,
                      color: "#666",
                      width: 80,
                      height: 60,
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {!!value ? dateFormat(value, "HH") : "HH"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ddd",
                      borderRadius: 4,
                      paddingHorizontal: 15,
                      color: "#666",
                      width: 80,
                      height: 60,
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    {!!value ? dateFormat(value, "mm") : "mm"}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexShrink: 1,
          flexGrow: 1,
          borderTopWidth: 4,
          borderBottomWidth: 4,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderColor: "#efefef"
        }}
      >
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              marginBottom: 10,
            }}
          >
            Outlet
          </Text>
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: 16,
            }}
          >
            {OutletStore.currentOutlet.nama}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {OutletStore.currentOutlet.alamat}
          </Text>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            {OutletStore.currentOutlet.open} - {OutletStore.currentOutlet.close}
          </Text>
          
        </View>
        {!!OutletStore.currentOutlet.img_url && (
          <Image
            source={{
              uri: AppConfig.serverUrl + OutletStore.currentOutlet.img_url,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
            }}
            resizeMode={"cover"}
          />
        )}
      </View>
    </>
  );
});
