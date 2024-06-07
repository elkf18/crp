import { useNavigation } from "@react-navigation/native";
import OutletStore from "app/model/outlet";
import TopBar from "app/ui/utils/TopBar";
import locationService from "app/utils/location";
import { Screen, Text, View } from "libs/ui";
import { observer, useLocalObservable } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import List from "./List";
import * as Location from 'expo-location';
import { LocationObject } from "expo-location";
import SessionStore from "app/model/session";
import { runInAction } from "mobx";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();


  const [location, setLocation] = useState<LocationObject | null>(null);//LocationObject
  const [watcher, setWatcher] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    SessionStore.latitude=0;
    SessionStore.longitude=0;
    (async () => {
      await locationService.askPermission();

      let enabled =await Location.hasServicesEnabledAsync()

      if(enabled){
        setWatcher(await Location.watchPositionAsync(
          {accuracy:Location.Accuracy.High},
          (loc) => {
            SessionStore._loadJSON({
              latitude:loc.coords.latitude,
              longitude:loc.coords.longitude
            })

            if(OutletStore.currentOutlet.firstAppOpen){
        
              OutletStore.checkNearestOutletX(loc.coords.latitude,loc.coords.longitude);
      
              if(OutletStore.currentOutlet.nama!==""){
                runInAction(()=>{
                  OutletStore.currentOutlet.firstAppOpen= false
                })
              }
              
            }
          }
        ))
      }else{
        
      }
      
    })();

    return () => {
      if(!!watcher){
        watcher.remove()
      }
    };
  }, []);


  return (
    <Screen
      style={{
        backgroundColor: "white",
      }}
      statusBar={{
        barStyle: "dark-content",
        backgroundColor: "#fff",
      }}
    >
      <TopBar title="Lokasi Outlet" />
      {/* <Filter /> */}
      <List />
    </Screen>
  );
});
