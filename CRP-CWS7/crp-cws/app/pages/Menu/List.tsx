import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
import color from "app/config/color";
import OutletStore from "app/model/outlet";
import { Area } from "app/model/outlet/outlet";
import { onScroll } from "app/utils/scrollEvent";
import { FlatList, Image, SectionList, Text, View } from "libs/ui";
import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { RefreshControl, ToastAndroid, useWindowDimensions } from "react-native";
import AreaTab from "./AreaTab";
import RenderItem from "./RenderItem";

const NavigationTab = createMaterialTopTabNavigator();

export default observer((props: any) => {
  
  
  useEffect(()=>{
    refresh();
  },[])

  const refresh = () => {
    OutletStore.loadArea();
  };
  

  // const refreshControl = (
  //   <RefreshControl refreshing={OutletStore.loading} onRefresh={refresh} />
  // );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {OutletStore.getOutlet.length > 0 && 
        <NavigationTab.Navigator
          initialRouteName={OutletStore.area[0].name}
          tabBar={(props) => <AreaTab tabs={OutletStore.getOutlet} {...props} />}
          tabBarPosition={"top"}
          swipeEnabled={false}
          lazy
          lazyPreloadDistance={0}
          
          removeClippedSubviews
          lazyPlaceholder={()=>{
            <Text>
              Loading...
            </Text>
          }}
          
          style={{
            backgroundColor: color.primary_surface,
          }}
        >
          {OutletStore.getOutlet.map((area: Area, key: number) => (
            <NavigationTab.Screen
              key={area.code}
              name={area.code}
              children={(props: any) => (
                <RenderList {...props} tab={area}  />
              )}
            />
          ))}
        </NavigationTab.Navigator>
      }
    </View>
  );
});

const RenderList = observer((props: any) => {
  const { tab } = props;
  const refresh = () => {
    OutletStore.loadArea();
  };
  


  useEffect(() => { 
    refresh();

  }, []);

  // useEffect(() => {
  //   if(isFocused){
  //     refresh();
  //   }
  // }, [isFocused]);

  return (
    <FlatList
      // refreshControl={refreshControl}\
      numColumns={2}
      data={OutletStore.getOutletByArea(tab.code)}
      keyExtractor={(item, index) => ""+item.id+""+index}
      renderItem={(props) => <RenderItem {...props} />}
      //onScroll={(e) => onScroll(e, scrollState)}
      contentContainerStyle={{
        paddingBottom: 80
      }}
    // ItemSeparatorComponent={() => (
    //   <View
    //     style={{
    //       borderWidth: 1,
    //       borderColor: "#ccc",
    //     }}
    //   />
    // )}
    />
  );
});