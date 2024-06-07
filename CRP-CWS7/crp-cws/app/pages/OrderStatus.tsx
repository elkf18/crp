import HistoryStore from "app/model/history";
import OutletStore from "app/model/outlet";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Image, Screen, ScrollView, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react-lite";
import React from "react";
import { Modal, RefreshControl } from "react-native";


import { BottomSheet } from 'react-native-btr';
import Transaksi from "./History/Detail/Transaksi";
import PaymentMethod from "./History/Detail/PaymentMethod";
import TransaksiList from "./History/Detail/TransaksiList";
import { useNavigation } from "@react-navigation/native";
import { runInAction } from "mobx";

export default observer((props: any) => {
  const { meta } = props;
  const Theme = useTheme();
  const item = HistoryStore.detail;
  const outlet = OutletStore.list.find((x) => x.id === item.id_outlet);
  const nav = useNavigation();

  const dismiss = () => {
    runInAction(() => {
      HistoryStore.detail.visible=false;
    });
  };

  const refresh = () => {
    if(HistoryStore.detail.fromOrder){
      HistoryStore.detail.fromOrder=false;
    }else{
      HistoryStore.detail.load();
    }
  };

  const refreshControl = (
    <RefreshControl
      refreshing={HistoryStore.detail.loading}
      onRefresh={refresh}
    />
  );

  return (
    <Modal
    visible={HistoryStore.detail.visible}
    onDismiss={dismiss}
    onRequestClose={dismiss}

    style={{
      position:"absolute",
      height:"75%",
      bottom:0,
      backgroundColor:"#ff0000",
      
    }}
    >
      <View
      style={{
        backgroundColor:"#ffffff",
        height:"75%",
        position:"absolute",
        bottom:0,
        paddingTop: item.status === "paid"||item.status === "draft"?0:10,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
      }}>
      
          {item.status === "paid"? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: Theme.colors.primary,
              
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Waktu pengambilan {dateFormat(item.est_delivery, "HH:mm")}.
            </Text>
          </View>
        ):<></>}
        {item.status === "draft"? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#ffb037",
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Sedang menunggu pembayaran.
            </Text>
          </View>
        ):<></>}
        <ScrollView >
          <View
            style={{
              flexDirection:"row",
              padding:15,
              alignItems:"center"
            }}>
              {(item.status === "cancelled"||item.status === "expired"||item.status === "expired by user"||item.status === "cancelled by user") ? 
                <Image
                source={require("app/assets/images/history-inactive.png")}
                style={{
                  height: 45,
                  width: 45,
                }}
              />
                :
                (
                <Image
                  source={require("app/assets/images/history-active.png")}
                  style={{
                    height: 45,
                    width: 45,
                  }}
                />
                )}
                <View
              style={{
                flexGrow:1
              }}></View>
            <View
              style={{
                flexDirection:"column",
              }}>
                <Text
                style={{
                  textAlign:"right"
                }}>
                {dateFormat(item.created_date, "EEEE, d MMMM yyyy, HH:mm")}
              </Text>
              <Text
                style={{
                  textAlign:"right"
                }}
              >
               No. Order {item.sales_order_number}
              </Text>
            </View>
          </View>
          
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          <View
          style={{
            padding:15
          }}
          >
            {(item.status === "cancelled"||item.status === "expired"||item.status === "expired by user"||item.status === "cancelled by user") && (
              <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                  fontSize:14,
                  color:"#ff0000"
                }}
              >
              Pesanan Dibatalkan
              </Text>
            )}
            <Text
                style={{
                  fontFamily: Fonts.MontserratBold,
                  marginBottom: 10,
                }}
              >
                {outlet?.nama}
              </Text>
              <Text
                style={{
                  fontSize:12
                }}
              >
                {outlet?.alamat}, {outlet?.kota}, {outlet?.provinsi}
              </Text>
          </View>
          
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          <TransaksiList />
          {/* <PaymentMethod /> */}
          <View
          style={{
            marginVertical:10,
            backgroundColor:"#dfdfdf",
            height:1
          }}
          />
          {/* <QRCode /> */}
          <View
          
          style={{
            marginTop:15,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  marginBottom: 20,
                  borderRadius: 16,
                  overflow: "hidden",
                  height: 300,
                  width: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri:
                      AppConfig.serverUrl +
                      HistoryStore.getCurrentOrder.qr_code,
                  }}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: Theme.fontStyle.bold,
                  fontSize: 16,
                }}
              >
                {HistoryStore.getCurrentOrder.sales_order_number}
              </Text>

              {/* {HistoryStore.getIsManyOrder && (
                <Text
                  style={{
                    fontFamily: Theme.fontStyle.bold,
                    fontSize: 16,
                  }}
                  onPress={() => {
                    nav.navigate("History");
                  }}
                >
                  Lihat order lainnya.
                </Text>
              )} */}
              <View
                style={{
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.MontserratBold,
                    color: Theme.colors.primary,
                    fontSize: 20,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  Kode QR Kamu
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Tunjukan kode QR kamu ke kasir pada saat pengambilan langsung
                  di outlet.
                </Text>
              </View>
        </View>
          
        </ScrollView>
      </View>
      
    </Modal>
  );
});
