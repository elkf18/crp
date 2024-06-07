import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import HistoryStore from "app/model/history";
import TopBar from "app/ui/utils/TopBar";
import { onScroll, resetScrollState } from "app/utils/scrollEvent";
import useTheme from "libs/hooks/useTheme";
import { Button, FlatList, SectionList } from "libs/ui";
import { dateFormat } from "libs/utils/date";
import { observable, runInAction, toJS } from "mobx";
import { useLocalObservable } from "mobx-react";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Image, Screen, ScrollView, Text, View } from "libs/ui";
import { BottomSheet } from "react-native-btr";
import OrderStatus from "../OrderStatus";
import GroupTab from "./GroupTab";
import RenderItem from "./RenderItem";
import { Dimensions, RefreshControl, ToastAndroid } from "react-native";
import MembershipStore from "app/model/membership";
import color from "app/config/color";
const NavigationTab = createMaterialTopTabNavigator();
import RenderCoupon from "app/pages/Coupons/RenderItem";
import SessionStore from "app/model/session";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  //console.log("scarooo -> "+value+": "+HistoryStore.detail.visible)
  return () => setValue(value => value + 1); // update the state to force render
}

export default observer((props: any) => {

  const { scrollState } = props;

  const forceUpdate = useForceUpdate();

  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const Theme = useTheme();
  const isFocused = useIsFocused();


  const featLuckyDraw = ()=>{
    if(SessionStore.features.lucky_draw){
      return [{
        label: "Lucky Draw",
        component: Coupons,
      }]
    }else{
      return []
    }
    
  }

  const Tab = [
    {
      label: "Points",
      component: Points,
    },
    ...featLuckyDraw()
  ];

  useEffect(() => {
    if (isFocused) {
      resetScrollState(scrollState);
    }
  }, [isFocused]);

  useEffect(() => {
    runInAction(() => (HistoryStore.filter.tab = "paid"));
    forceUpdate();
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      <TopBar title="History" hiddenBack />
      <NavigationTab.Navigator
        initialRouteName={Tab[0].label}
        tabBar={(props) => <GroupTab tabs={Tab} {...props} />}
        tabBarPosition={"top"}
        swipeEnabled={true}
        style={{
          backgroundColor: color.natural_100,
        }}
      >
        {Tab.map((tab, key) => (
          <NavigationTab.Screen
            key={key}
            name={tab.label}
            {...tab}
          />
        ))}
      </NavigationTab.Navigator>
    </View>
  );
});
const EmptyDataPage = (props: any) => {
  return (
    <View style={{
      backgroundColor: color.natural_100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        There is No Data {props.status}
      </Text>
    </View>
    // <View style={{
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   backgroundColor: color.natural_100,
      
    // }}>
    //   <Text>
    //     There is No Data {props.status}
    //   </Text>
    // </View>
  )
}

const Points = observer((props: any) => {
  const isFocus = useIsFocused(); 

  useEffect(() => {
    refresh();
  }, [isFocus])

  useEffect(() => {
    refresh();
  }, [])

  const refresh = async () => {
    meta.offset = 0
    loadMore();
  }

  const meta = useLocalObservable(() => ({
    offset: 0
  }))

  const loadMore = () => {
    MembershipStore.loadMorePoint(meta.offset)
  }
  const refreshControl = (
    <RefreshControl refreshing={MembershipStore.loadingPoint} onRefresh={refresh} />
  );

  return (
    <View style={{
      flex: 1,
    }}>
      
        <FlatList
        refreshControl={refreshControl}
          data={MembershipStore.listPoint}
          keyExtractor={(item, index) => index+""}
          renderItem={({ item,index }: any) => <RenderItem key={index} item={item} />}
          style={{
            backgroundColor: color.natural_100,
          }}
          ListEmptyComponent={EmptyDataPage}
          contentContainerStyle={{
            paddingBottom: 73
          }}
          onEndReached={()=>{
            if(!MembershipStore.loadingPoint) {
              meta.offset = MembershipStore.listPoint.length
              loadMore()
            }
          }}
          onEndReachedThreshold={5}
        /> 
    </View>
  )
});

const Coupons = observer((props: any) => {
  const isFocus = useIsFocused();

  useEffect(() => {
    refresh();
  }, [isFocus])

  const refresh = async () => {
    meta.offset = 0
    MembershipStore.loadMoreHistoryCoupon(meta.offset);
  }
  
  const meta = useLocalObservable(() => ({
    offset: 0
  }))
  
  const loadMore = () => {
    MembershipStore.loadMoreHistoryCoupon(meta.offset)
  }
  const refreshControl = (
    <RefreshControl refreshing={MembershipStore.loadingCoupon} onRefresh={refresh} />
  );

  return (
    
    <View style={{
      flex: 1,
    }}>
      <FlatList
        data={MembershipStore.historyCoupon}
        refreshControl={refreshControl}
        keyExtractor={(item, index) => index+""}
        renderItem={({ item, index }: any) => <RenderCoupon key={index} item={item} />}
        style={{
          backgroundColor: color.natural_100,
        }}
        contentContainerStyle={{
          paddingBottom:80
        }}
        ListEmptyComponent={EmptyDataPage}
        onEndReached={()=>{
            if(!MembershipStore.loadingCoupon) {
              meta.offset = MembershipStore.listCoupon.length+1
              loadMore()
            }
          }}
        onEndReachedThreshold={0}
      />
    </View>
  )
})

const EVoucher = observer((props: any) => {
  const isFocus = useIsFocused();

  useEffect(() => {
  }, [isFocus])

  return (
    <View style={{
      backgroundColor: color.natural_100,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        There is No Data {props.status}
      </Text>
    </View>
  )
})



