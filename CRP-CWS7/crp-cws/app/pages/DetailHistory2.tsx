import Fonts from "libs/assets/fonts";
import { Screen, ScrollView, Text, View } from "libs/ui";
import { useNavigation } from "@react-navigation/native";
import OrderSwipe from "app/pages/History/Detail/OrderSwipe";
import TopBar from "app/ui/utils/TopBar";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";
import useTheme from "libs/hooks/useTheme";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();

  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#00000000",
      }}
    >
      <TopBar
        label={"Detil Pesanan"}
        onGoBack={() => nav.navigate("History")}
      />
      <ScrollView>
        <View
          style={{
            padding: 15,
          }}
        >
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                color: Theme.colors.primary,
              }}
            >
              Status Pesanan
            </Text>
            <Text>Pesananmu sedang di proses.</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                color: Theme.colors.primary,
              }}
            >
              Ketabang Kali
            </Text>
            <Text>Jalan jalan bla bla.</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                color: Theme.colors.primary,
              }}
            >
              Detail Transaksi
            </Text>
            <Text>12312312312</Text>
          </View>

          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.MontserratBold,
                color: Theme.colors.primary,
              }}
            >
              Transaksi
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                1x
              </Text>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                  }}
                >
                  Es Kopi Susu
                </Text>
                <Text>Less Sugar, Normal Ice</Text>
                <Text>Tidak ada catatan</Text>
              </View>
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                }}
              >
                22.000
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <OrderSwipe />
    </Screen>
  );
});
