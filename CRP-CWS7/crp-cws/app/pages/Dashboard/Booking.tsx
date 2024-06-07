
import OutletStore from "app/model/outlet";
import { LocationObject } from "expo-location";
import * as Location from 'expo-location';
import Fonts from "libs/assets/fonts";
import AppConfig from "libs/config/app";
import useTheme from "libs/hooks/useTheme";
import { Button, Image, Text, View } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Dimensions, ToastAndroid } from "react-native";

import locationService from "app/utils/location";
import { useNavigation } from "@react-navigation/core";
import { dateFormat } from "libs/utils/date";


export default observer(() => {
  const nav = useNavigation();
  const dim = Dimensions.get("window");
  const Theme = useTheme();
  //const isFocused = useIsFocused();
  const kedai = OutletStore.currentOutlet;
  let interval: any;

  //////////////////////////////////////////////////
  const local = useLocalObservable(() => ({
    lat: 0,
    long: 0,
    time:"",
    
  }));

  const [location, setLocation] = useState<LocationObject | null>(null);//LocationObject
  const [watcher, setWatcher] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    
    (async () => {
      await locationService.askPermission();
      kedai.load();
      let enabled =await Location.hasServicesEnabledAsync()

      if(enabled){
        setWatcher(await Location.watchPositionAsync(
          {accuracy:Location.Accuracy.High},
          (loc) => {
            //setLocation(loc);
            
            local.lat = loc.coords.latitude
            local.long = loc.coords.longitude
            local.time=dateFormat( new Date(loc.timestamp))

            if(OutletStore.isChosen==false){
              OutletStore.nearestOutlet(loc.coords.latitude,loc.coords.longitude);
            }
            
          }
        ))
      }else{
        alert("Silahkan menyalakan GPS terlebih dahulu.")
        nav.goBack()
      }
      
    })();

    return () => {
      if(!!watcher){
        
        watcher.remove()
      }
    };
  }, []);
  //////////////////////////////////////////////////

  

  
  // useEffect(() => {
  //   kedai.load();
  // },[])
  

  // useEffect(() => {
  //   if (isFocused) {
  //     interval = setInterval(() => {
  //       kedai.load();
        
  //     }, 3000);
  //   } else {
  //     if (!!interval) {
  //       clearInterval(interval);
  //     }
  //   }
  // }, [isFocused]);



  return (
    <View>
      

      {/* <Text
      style={{
        textAlign:"center",
        backgroundColor:"#333333",
        color:"#cccccc",
        marginTop:15,
        paddingVertical:4
      }}
      >
        {local.epoch}
      </Text>
      <Text
      style={{
        textAlign:"center",
        backgroundColor:"#cccccc",
        paddingVertical:4
      }}
      >
        {local.lat!==0? local.lat+", "+local.long:"GPSmu ampas ti"}
      </Text>

      <Text
      style={{
        textAlign:"center",
        backgroundColor:"#333333",
        color:"#cccccc",
        paddingVertical:4
      }}
      >
        {local.time!==""? local.time : "...."}
      </Text> */}


      <Text
        style={{
          color: Theme.colors.primary,
          fontFamily: Fonts.MontserratBold,
          fontSize: Theme.fontSize.h5,
          textAlign: "center",
          marginVertical: 15,
        }}
      >
        Hari ini mau pesan apa?
      </Text>
      <View
        shadow
        style={{
          flexDirection: "row",
          marginHorizontal: 15,
          borderRadius: 12,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: (1 / 3) * dim.width,
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: AppConfig.serverUrl + kedai.img_url,
            }}
            style={{
              width: 150,
              height: 140,
            }}
            resizeMode={"cover"}
          />
          <Button
            shadow
            style={{
              backgroundColor: "#F1EFF0",
              flexGrow: 0,
              borderRadius: 99,
              position: "absolute",
              bottom: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={() => nav.navigate("Outlet")}
          >
            <Text
              style={{
                fontFamily: Theme.fontStyle.bold,
                color: "#888",
                fontSize: 12,
              }}
            >
              Ubah Kedai
            </Text>
          </Button>
        </View>
        <View
          shadow
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            flex: 1,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 10,
              borderRadius: 12,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: Theme.fontStyle.bold,
              }}
            >
              {OutletStore.isChosen?"Kedai Dipilih:":"Kedai Terdekat:"}


              
              {/* {OutletStore.isChosen?"Kedai yang kamu pilih:":"Kedai terdekat dari kamu saat ini ialah:"} */}
              
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#8FA4A9",
                  fontFamily: Theme.fontStyle.bold,
                  flexShrink: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {kedai.nama}
              </Text>
              <View
                style={{
                  backgroundColor: Theme.colors.primary,
                  borderRadius: 99,
                  paddingHorizontal: 5,
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: Theme.fontStyle.bold,
                    color: "#fff",
                  }}
                >
                  {kedai.status}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 9,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {kedai.alamat}
            </Text>
            <Text
              style={{
                fontSize: 9,
              }}
            >
              {kedai.open} - {kedai.close} | {kedai.telpon}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FFE2C4",
              alignItems: "center",
            }}
          >
            {kedai.status !== "OPEN" && (
              <Button
                style={{
                  borderRadius: 99,
                  paddingHorizontal: 30,
                }}
                onPress={() => nav.navigate("Menu")}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: Theme.fontStyle.bold,
                    fontSize: 16,
                  }}
                >
                  PESAN
                </Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
