import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import color from "app/config/color";
import { fontFamily, fontSize } from "app/config/const";
import HistoryStore from "app/model/history";
import SessionStore from "app/model/session";
import TabList from "app/ui/qrcode/TabList";
import TopBar from "app/ui/utils/TopBar";
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Icon, Image, Screen, ScrollView, Text, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import QRCode from 'react-native-qrcode-svg';
const NavigationTab = createMaterialTopTabNavigator();

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();

  const tabs = [
    {
      name: "Order QR Code",
      component: Order,
    }
    ,
    {
      name: "My QR Code",
      component: User,
    }
  ];

  useEffect(() => {
    HistoryStore.load("paid");
  }, []);

  return (
    <>
    
      {/* <NavigationTab.Navigator
        initialRouteName="Baru"
        tabBar={(props) => <TabList tabs={tabs} {...props} />}
        lazy={true}
        
        tabBarPosition={"top"}
        swipeEnabled={true}
      >
        {tabs.map((tab, key) => (
          <NavigationTab.Screen key={key} {...tab} />
        ))}
      </NavigationTab.Navigator> */}
      <TopBar title="QRCode" />
      <Order/>
      </>
  );
});

const Order = observer(() => {
  
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  return (
      // <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{
            color: color.natural_20,
            fontFamily: fontFamily.medium,
            fontSize: fontSize.l
          }}>
            My QR Code
          </Text>
          <Text style={{
            color: color.natural_60,
            fontFamily: fontFamily.reguler,
            fontSize: fontSize.m,
            marginTop: 5,
          }}>
            Tunjukkan ke kasir ketika akan membayar
          </Text>
          <View style={{
            marginTop :20
          }}>
          <QRCode 
          backgroundColor={color.primary_surface}
            value={SessionStore.user.qrCode}
            size={200}
          />
          </View>
          <Text style={{
            marginTop :6
          }}>
          {SessionStore.user.qrCode}
          </Text>
          <Button
            onPress={() => {
              nav.goBack();
            }}
            style={{
              borderRadius: 4,
              marginTop: 10,
              width: '60%'
            }}
          >
            <Text style={{
              fontFamily: fontFamily.bold,
              fontSize: fontSize.m,
              color: color.natural_100
            }}>
              Tutup
            </Text>
          </Button>
          
         
        </View>
      // </ScrollView>
  );
});

const User = observer(() => {
  
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();
  useEffect(() => {
    HistoryStore.load("paid");
  }, []);

  return (
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.MontserratBold,
              color: "#333333",
              fontSize: 14,
              marginTop:32,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            Kode QR Saya
          </Text> 
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
          <QRCode
            value={SessionStore.user.phone1}
            size={250}
          />
        </View>
              {/* <Text
                style={{
                  fontFamily: Theme.fontStyle.bold,
                  fontSize: 16,
                }}
              >
                {SessionStore.user.phone1}
              </Text> */}

              
              <View
                style={{
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <View
                  style={{
                      flexDirection:"row",
                      padding:10,
                      backgroundColor:"#F5F2F0",
                      borderRadius:8
                  }}
                  >
                      <Icon name="info-outline" source="MaterialIcons" size={18} color="#808080"/>
                      <View style={{width:10}}/>
                      <Text
                      style={{
                          fontFamily:Fonts.MontserratRegular,
                          color:"#808080",
                          paddingEnd:10
                      }}>
                          Tunjukan ini ke kasir setiap kamu melakukan pembelian langsung di kedai
                      </Text>
                  </View>
              </View>
        </View>
      </ScrollView>
  );
});
