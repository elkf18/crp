import { useNavigation } from "@react-navigation/core";
import { useState } from "react"
import NewsStore from "app/model/news";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import color from "app/config/color";
import { Button, Icon, Image, Screen, ScrollView, Text, View } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observer } from "mobx-react";
import React from "react";
import { Linking, useWindowDimensions, Modal, Pressable, StyleSheet, Alert } from "react-native";
import { fontFamily, fontSize } from "app/config/const";
import ProductStore from "app/model/product";
import RedeemStore from "app/model/product/redeem";
import QRCode from "react-native-qrcode-svg";

export default observer(() => {
  const Theme = useTheme();
  const dim = useWindowDimensions();
  const item = NewsStore.detail;
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  const loadInBrowser = () => {
    if (!item.link_url.includes("https://")) {
      item.link_url = "https://" + item.link_url
    }
    Linking.openURL(item.link_url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Screen
      statusBar={{
        barStyle: "light-content",
      }}
      style={{
        backgroundColor:color.natural_100
      }}
    >
      <View>
        <Image
          source={{
            uri: AppConfig.serverUrl + ProductStore.detail.url_pic,
          }}
          style={{
            height: 150,
            width: dim.width,
          }}
          resizeMode="cover"
        />
        <Button
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            borderRadius: 99,
            backgroundColor: "#ffffff50",
            paddingHorizontal: 5,
            height: 45,
            width: 45,
          }}
          onPress={() => {
            nav.goBack();
          }}
        >
          <Icon
            name="chevron-back"
            size={30}
            color="#fff"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          />
        </Button>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: fontSize.xl,
              fontFamily: fontFamily.medium,
              color: color.natural_20,
              marginTop: 20
            }}
          >
            {ProductStore.detail.name}
          </Text>
          <View style={{ marginVertical: 16, borderBottomColor: color.natural_90, borderBottomWidth: 1, }} />
          <View style={{
            flexDirection: 'row',
            flex: 1,
            alignSelf: 'center'
          }}>
            <Text
              style={{
                fontSize: fontSize.s,
                fontFamily: fontFamily.reguler,
                color: color.natural_60,
                marginVertical: 5
              }}
            >
              Timeout Redeem
            </Text>
            <Text
              style={{
                fontSize: fontSize.s,
                fontFamily: fontFamily.medium,
                color: color.secondary_main,
                marginVertical: 5,
                marginLeft: 2
              }}
            >
              {dateFormat(RedeemStore.detail.expired_time)}
            </Text>
          </View>
          <Pressable
            style={{
              flex: 1,
              flexGrow: 1,
            }}
            onPress={() => setModalVisible(true)}
          >
            <View style={{
              flexGrow: 1,
              width: "100%",
              alignItems: 'center',
              alignContent: "center",
              alignSelf: "center",
              backgroundColor: color.natural_20,
              borderStyle: 'dashed',
              borderRadius: 1,
              borderWidth: 2,
              borderColor:color.natural_20,
              flexDirection: "row",
              paddingHorizontal: 16,

            }}>
              <Text style={{
                fontSize: fontSize.m,
                fontFamily: fontFamily.medium,
                color: color.natural_100,
                paddingTop: 8,
                paddingBottom: 4,
                marginBottom: 5,
                flexGrow: 1
              }}>
                {RedeemStore.detail.redeem_code}
              </Text>
              <Icon name="qrcode" source="FontAwesome" size={24} color={color.secondary_main} />
            </View>
          </Pressable>
          <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000077"
            }}>
              <View style={{
                flexDirection: 'column',
                margin: 20,
                backgroundColor: "white",
                borderRadius: 16,
                padding: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
              }}>
                <Text style={{
                  color: color.natural_20,
                  fontFamily: fontFamily.medium,
                  textAlign: 'center',
                  fontSize: fontSize.l
                }}>
                  QR Code Redeem
                </Text>
                <Text style={{
                  color: color.natural_60,
                  fontFamily: fontFamily.reguler,
                  textAlign: 'center',
                  fontSize: fontSize.m,
                  marginBottom:16
                }}>
                  Tunjukan QR ke CS untuk mengambil reward
                </Text>

                <QRCode
                  backgroundColor={color.primary_surface}
                  value={RedeemStore.detail.redeem_code}
                  size={200}
                />
                <Text style={{
                  color: color.natural_20,
                  fontFamily: fontFamily.reguler,
                  textAlign: 'center',
                  fontSize: fontSize.s,
                  marginTop:16
                }}>
                  {RedeemStore.detail.redeem_code}
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 10, }}>
                  <Text style={{ 
                    color: color.natural_60, 
                    fontFamily: fontFamily.reguler, 
                    textAlign: 'center', 
                    fontSize: fontSize.s, }}>
                    Timeout Reedem </Text>
                  <Text style={{ color: color.secondary_main, fontFamily: fontFamily.bold, textAlign: 'center', fontSize: fontSize.s, }}>
                    {dateFormat(RedeemStore.detail.expired_time)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <Pressable
                    style={{ flexGrow: 1, marginLeft: 5 }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={{ textAlign: 'center', color: color.natural_100, backgroundColor: color.primary_main, fontFamily: fontFamily.bold, fontSize: fontSize.m, paddingVertical: 8, borderRadius: 4 }}>Tutup</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View style={{
            flexDirection: 'row',
            flex: 1,
            alignSelf: 'center',
            marginTop: 5
          }}>
            <Icon style={{ flexGrow: 0, marginHorizontal: 10, alignItems: 'center' }} name="alert-circle-outline" source="MaterialCommunityIcons" size={16} color={color.warning_main} />
            <Text style={{ color: color.warning_main, fontFamily: fontFamily.reguler, fontSize: fontSize.s }}>
              Segera tukarkan ke Customer Center
            </Text>
          </View>


          <Text
            style={{
              fontSize: fontSize.m,
              fontFamily: fontFamily.reguler,
              color: color.natural_20,
              marginTop: 20,
              textAlign: 'justify'
            }}
          >
            {ProductStore.detail.description}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
});
const styles = StyleSheet.create({
  centeredView: {

  },
  modalView: {

  },
  button: {
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});