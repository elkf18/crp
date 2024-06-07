import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useTheme } from "@react-navigation/native";
import GroupTab from "app/ui/inbox/GroupTab";
import List from "app/ui/inbox/List";
import ListNotification from "app/ui/inbox/ListNotification";
import TopBar from "app/ui/utils/TopBar";
import { FlatList, Screen, View } from "libs/ui";
import { observer } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";


const NavigationTab = createMaterialTopTabNavigator();

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();

  const Tab = [
    {
      label: "Notifications",
      value: "notifikasi",
    },
    {
      label: "Pesan",
      value: "pesan",
    },
  ];
  return (
    <Screen
      style={{
        backgroundColor: "#f0efef",
      }}
      statusBar={{
        barStyle: "dark-content",
      }}
    >
      <TopBar title="Notifications" />
      <NavigationTab.Navigator
        initialRouteName={Tab[0].value}
        tabBar={(props) => <GroupTab tabs={Tab} {...props} />}
        tabBarPosition={"top"}
        swipeEnabled={true}
        style={{
          backgroundColor: useTheme().colors.background,
        }}
      >
        {Tab.map((tab: any, key: number) => (
          <NavigationTab.Screen
            key={key}
            name={tab.value}
            children={(props: any) => (
              <View>
              {/* <Text>{key}</Text>
              <Text>{tab.value}</Text> */}
              {key == 0? (
                <>
                 <ListNotification/>
                 </>
              ):(
                <List />
              )}
              </View>
            )}
          />
        ))}
      </NavigationTab.Navigator> 
      
    </Screen>
  );
});
